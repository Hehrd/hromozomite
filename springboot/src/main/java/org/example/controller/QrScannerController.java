package org.example.controller;

import org.example.controller.model.QrScannerDTO;
import org.example.exception.UserNotFoundException;
import org.example.service.QrScannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class QrScannerController {

    @Autowired
    private QrScannerService qrScannerService;

    @RequestMapping(value = "/createpayment", method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity <String> qrScannerSave(@RequestBody QrScannerDTO qrScannerDTO, @CookieValue(value = "SESSION_STRING") String sessionString) throws UserNotFoundException {
        qrScannerService.qrScannerSave(qrScannerDTO);
        return ResponseEntity
                .status(200)
                .body("QR scanner created successfully!");
    }
}