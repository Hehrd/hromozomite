package org.example.controller;

import org.example.controller.model.GoalDTO;
import org.example.controller.model.SinglePaymentDTO;
import org.example.controller.model.SalaryDTO;
import org.example.exception.UserNotFoundException;
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

@Controller
@RequestMapping(value = "/userData")
public class UserDataController {
    @Autowired
    private UserDataService userDataService;

    @RequestMapping(value = "/payments", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> setPayments(@RequestBody SinglePaymentDTO singlePaymentDTO,
                                              @CookieValue(value = "SESSION_STRING") String sessionString) throws UserNotFoundException {
        userDataService.setPayments(singlePaymentDTO, sessionString);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Payments set successfully!");
    }

    @RequestMapping(value="/goal", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> setGoal(@RequestBody GoalDTO goalDTO, @CookieValue(value = "SESSION_STRING") String sessionString) throws UserNotFoundException {
        userDataService.setGoal(goalDTO, sessionString);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Goal set successfully!");
    }
    @RequestMapping(value="/salary", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> setSalary(@RequestBody SalaryDTO salaryDTO, @CookieValue(value = "SESSION_STRING") String sessionString) throws UserNotFoundException {
        userDataService.setSalary(salaryDTO, sessionString);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Salary set successfully!");
    }
}