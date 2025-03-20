package org.example.controller;

import org.example.controller.model.PaymentsDTO;
import org.example.service.PaymentStatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/statistic")
public class UserStatisticController {

    @Autowired
    private PaymentStatisticsService paymentStatisticsService;

    @RequestMapping(value = "/weekly", method = RequestMethod.POST)
    public Map<String, Integer> getWeeklyStatistics(@RequestBody List<PaymentsDTO> payments){
        return paymentStatisticsService.calculateWeeklyStatistics(payments);
    }
}
