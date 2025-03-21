package org.example.controller;

//import com.stripe.Stripe;
//import com.stripe.exception.StripeException;
//import com.stripe.model.Charge;
//import com.stripe.param.ChargeCreateParams;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.PaymentIntent;
import com.stripe.param.ChargeCreateParams;
import com.stripe.param.PaymentIntentCreateParams;
import org.example.controller.model.PaymentRequest;
import org.example.controller.model.SinglePaymentDTO;
import org.example.exception.UserNotFoundException;
import org.example.service.StripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/stripe")
@CrossOrigin(origins = "${host}", allowCredentials = "true")
public class StripeController {
    @Autowired
    private StripeService stripeService;

    @RequestMapping(value = "/create-payment-intent", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> chargeCard(@RequestBody PaymentRequest request, @CookieValue(value = "SESSION_STRING") String sessionString) throws StripeException, UserNotFoundException {
        return ResponseEntity.ok(stripeService.chargeCustomer(sessionString, request));
    }
}
