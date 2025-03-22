package org.example.controller;

import org.example.controller.model.SubscriptionDTO;
import org.example.exception.UserNotFoundException;
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

    @RequestMapping(value = "/addsubscription", method = RequestMethod.GET)
    public ResponseEntity<String> subscribe(@RequestBody SubscriptionDTO subscriptionDTO, @CookieValue(value = "SESSION_STRING") String sessionString) throws UserNotFoundException {
        subscriptionService.saveSubscription(subscriptionDTO);
        return ResponseEntity
                .status(200)
                .body("Subscription created successfully!");
    }
}