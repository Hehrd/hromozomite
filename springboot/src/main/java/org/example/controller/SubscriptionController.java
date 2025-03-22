package org.example.controller;

import org.example.controller.model.Name;
import org.example.controller.model.SubscriptionDTO;
import org.example.exception.UserNotFoundException;
import org.example.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller()
@RequestMapping(value = "/subscription")
@CrossOrigin(origins = "${host}", allowCredentials = "true")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @RequestMapping(value = "/addsubscription", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addSubscription(@RequestBody SubscriptionDTO subscriptionDTO, @CookieValue(value = "SESSION_STRING") String sessionString) throws UserNotFoundException {
        subscriptionService.saveSubscription(subscriptionDTO, sessionString);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Subscription created successfully!");
    }

    @RequestMapping(value = "/deletesubscription", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deleteSubscription(@RequestBody Name name, @CookieValue(value = "SESSION_STRING") String sessionString) {
        subscriptionService.deleteSubscription(name.getName(), sessionString);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Subscription deleted successfully!");
    }

    @RequestMapping(value = "/getsubscriptions", method = RequestMethod.GET)
    public ResponseEntity<List<SubscriptionDTO>> getSubscriptions(@CookieValue(value = "SESSION_STRING") String sessionString) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(subscriptionService.getSubscriptions(sessionString));
    }
}