package org.example.controller;

import org.example.controller.model.PaymentsForADayDTO;
import org.example.exception.UserNotFoundException;
import org.example.service.PaymentStatisticsService;
import org.example.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/statistics")
@CrossOrigin(origins = "${host}", allowCredentials = "true")
public class UserStatisticController {

    @Autowired
    private PaymentStatisticsService paymentStatisticsService;

    @Autowired
    private SessionService sessionService;

    @RequestMapping(value ="/weekly", method = RequestMethod.GET)
    public ResponseEntity<List<PaymentsForADayDTO>> getWeeklyStatistics(@CookieValue(value = "SESSION_STRING") String sessionString) throws UserNotFoundException {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(paymentStatisticsService.calculateWeeklyStatistics(sessionString));

    }

}
