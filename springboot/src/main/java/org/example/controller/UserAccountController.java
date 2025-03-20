package org.example.controller;

import org.example.controller.model.UserCredentialsDTO;
import org.example.exception.EmailAlreadyInUseException;
import org.example.exception.UserNotFoundException;
import org.example.service.UserAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/userAccount")
@CrossOrigin(origins = "http://localhost:5173")
@Controller
public class UserAccountController {
    @Autowired
    private UserAccountService userAccountService;

    @RequestMapping(value = "/login", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> login(@RequestBody UserCredentialsDTO userCredentialsDTO, @CookieValue(value = "SESSION_STRING") String sessionString) throws UserNotFoundException{
        userAccountService.login(userCredentialsDTO);
        StringBuilder cookieBuilder = new StringBuilder();
        cookieBuilder.append("SESSION_STRING=");
        cookieBuilder.append(sessionString);
        cookieBuilder.append("; Path=/");
        cookieBuilder.append("; Secure");
        cookieBuilder.append("; SameSite=Strict");
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.SET_COOKIE, cookieBuilder.toString());
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
}