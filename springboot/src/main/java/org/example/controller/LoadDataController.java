package org.example.controller;

import jakarta.websocket.server.PathParam;
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
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping(value = "/loadData")
public class LoadDataController {

    @Autowired
    private LoadDataService loadDataService;

<<<<<<< HEAD
//    @RequestMapping(value = "/transactions", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<List<SinglePaymentDTO>> loadData(@RequestBody DateRangeDTO dateRangeDTO, @CookieValue(value = "SESSION_STRING", required = false) String sessionString) throws UserNotFoundException {
//
//        List<SinglePaymentDTO> result = loadDataService.getPaymentsBetween(dateRangeDTO.getStartDate(), dateRangeDTO.getEndDate());
//
//        return ResponseEntity
//                .status(HttpStatus.OK)
//                .body(result);
//    }
=======
    @RequestMapping(value = "/transactions", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SinglePaymentDTO>> loadData(@RequestBody DateRangeDTO dateRangeDTO, @CookieValue(value = "SESSION_STRING", required = true) String sessionString) throws UserNotFoundException {

        List<SinglePaymentDTO> result = loadDataService.getPaymentsBetween(dateRangeDTO.getStartDate(), dateRangeDTO.getEndDate());
>>>>>>> e6cc8335cf1fd144c25c71e4ece3a6897a56f2ad

    @RequestMapping(value = "/getpaymentsbydate/{date}", method = RequestMethod.GET)
    public ResponseEntity<List<SinglePaymentDTO>> getPaymentsByDate(@PathVariable("date") LocalDate date, @CookieValue(value = "SESSION_STRING", required = true) String sessionString) throws UserNotFoundException {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(loadDataService.getPaymentsByDate(date, sessionString));
    }

    @RequestMapping(value = "/last-3-transactions", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<SinglePaymentDTO>> getLast3Transactions(@RequestBody SinglePaymentDTO singlePaymentDTO, @CookieValue(value = "SESSION_STRING", required = true) String sessionString) throws UserNotFoundException {


        List<SinglePaymentDTO> result = loadDataService.getLastTransactions(sessionString);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(result);
    }
}