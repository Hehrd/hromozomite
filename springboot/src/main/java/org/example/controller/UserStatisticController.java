package org.example.controller;

import org.example.service.PaymentStatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/statistic")
@CrossOrigin(origins = "${host}", allowCredentials = "true")
public class UserStatisticController {

    @Autowired
    private PaymentStatisticsService paymentStatisticsService;

    @RequestMapping(value ="/weekly", method = RequestMethod.GET)
    public ResponseEntity<List<Integer>> getWeeklyStatistics(){
        return ResponseEntity
                .status(HttpStatus.OK)
                        .body(paymentStatisticsService.calculateWeeklyStatistics());

    }
}
