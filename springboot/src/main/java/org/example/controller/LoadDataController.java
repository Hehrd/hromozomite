package org.example.controller;

import org.example.controller.model.DateRangeDTO;
import org.example.controller.model.SinglePaymentDTO;
import org.example.exception.UserNotFoundException;
import org.example.service.LoadDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Controller
public class LoadDataController {

    @Autowired
    private LoadDataService loadDataService;

    @RequestMapping(value = "/transactions", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SinglePaymentDTO>> loadData(@RequestBody DateRangeDTO dateRangeDTO, @CookieValue(value = "SESSION_STRING", required = true) String sessionString) throws UserNotFoundException {

        List<SinglePaymentDTO> result = loadDataService.getPaymentsBetween(dateRangeDTO.getStartDate(), dateRangeDTO.getEndDate());

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(result);
    }

    @RequestMapping(value = "/last-3-transactions", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SinglePaymentDTO>> getLast3Transactions(@RequestBody SinglePaymentDTO singlePaymentDTO, @CookieValue(value = "SESSION_STRING", required = true) String sessionString) throws UserNotFoundException {


        List<SinglePaymentDTO> result = loadDataService.getLastTransactions(sessionString);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(result);
    }
}