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
    @Value( "${stripe.api.key}")
    private String apiKey;
    @RequestMapping(value = "/create-payment-intent", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> chargeCard(@RequestBody PaymentRequest request) throws StripeException {
        Stripe.apiKey = apiKey;
        PaymentIntentCreateParams createParams = PaymentIntentCreateParams.builder()
                .setAmount(request.getAmount())    // e.g. 1234 means $12.34 if currency=usd
                .setCurrency(request.getCurrency())
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods
                                .builder()
                                .setEnabled(true)
                                .build()
                )
                .build();

        // Create the PaymentIntent on Stripe
        PaymentIntent paymentIntent = PaymentIntent.create(createParams);

        // Return the clientSecret to the frontend
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("clientSecret", paymentIntent.getClientSecret());
        return ResponseEntity.ok(responseData);
    }
}
