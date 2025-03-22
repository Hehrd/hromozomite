package org.example.controller;

import org.example.controller.model.UserCredentialsDTO;
import org.example.exception.EmailAlreadyInUseException;
import org.example.exception.UserNotFoundException;
import org.example.service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/useraccount")
@CrossOrigin(origins = "${host}", allowCredentials = "true")
@Controller
public class UserAccountController {
    @Autowired
    private UserAccountService userAccountService;

    @RequestMapping(value = "/login", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> login(@RequestBody UserCredentialsDTO userCredentialsDTO) throws UserNotFoundException {
        String sessionString = userAccountService.login(userCredentialsDTO);
        ResponseCookie cookie = ResponseCookie.from("SESSION_STRING", sessionString)
                .path("/")
                .httpOnly(true)
                .secure(false)  // Set to true if using HTTPS
                .maxAge(24 * 60 * 60) // 1 day
                .build();
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity
                .status(HttpStatus.OK)
                .headers(headers)
                .body("Logged in successfully!");
    }
    @RequestMapping(value = "/signup", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> signup(@RequestBody UserCredentialsDTO userCredentialsDTO) throws EmailAlreadyInUseException {
        userAccountService.signup(userCredentialsDTO) ;
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("User registered successfully!");
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    ResponseEntity<String> logout(@CookieValue(value = "SESSION_STRING") String sessionString) {
        userAccountService.logout(sessionString);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Logged out successfully!");
    }
    @GetMapping("/me")
    public ResponseEntity<String> getUser() {
        return ResponseEntity.ok("User found");
    }

    @RequestMapping(value ="/isloggedin", method = RequestMethod.GET)
    private ResponseEntity<Boolean> isLoggedIn(@CookieValue(value = "SESSION_STRING") String sessionString) {
        Boolean isLoggedIn = true;
        if(sessionString == null) {
            isLoggedIn = false;
        }
        return ResponseEntity.ok(isLoggedIn);
    }
}