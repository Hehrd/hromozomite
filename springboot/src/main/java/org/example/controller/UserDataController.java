package org.example.controller;

import org.example.controller.model.PaymentsDTO;
import org.example.service.UserAccountService;
import org.example.service.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.time.LocalDate;

@Controller
@RequestMapping(value = "/userData")
public class UserDataController {
    @Autowired
    private UserDataService userDataService;

    @RequestMapping(value = "/payments", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> setPayments(@RequestBody PaymentsDTO paymentsDTO,
                                              @CookieValue(value = "SESSION_STRING") String sessionString) {
        userDataService.setPayments(paymentsDTO, sessionString);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Payments set successfully!");
    }
}
