package org.example.controller;

import org.example.controller.model.SubscriptionDTO;
import org.example.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "${host}", allowCredentials = "true")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @RequestMapping(value = "/subscription", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> subscribe(@RequestBody SubscriptionDTO subscriptionDTO, @CookieValue(value = "SESSION_STRING") String sessionString) {
        subscriptionService.saveSubscription(subscriptionDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Subscription created successfully!");
    }
}