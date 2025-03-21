package org.example.controller;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.param.ChargeCreateParams;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/stripe")
public class StripeController {
    @RequestMapping(value = "/chargeCard", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> chargeCard(@RequestParam("tokenId") String tokenId) throws StripeException {
        Stripe.apiKey = "";
        ChargeCreateParams params =
                ChargeCreateParams.builder()
                        .setAmount(1099L)
                        .setCurrency("usd")
                        .setSource("tok_visa")
                        .build();
        Charge charge = Charge.create(params);
        return ResponseEntity
                .status(HttpStatus.OK)
                .;
    }
}
