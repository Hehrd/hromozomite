package org.example.controller;

//import com.stripe.Stripe;
//import com.stripe.exception.StripeException;
//import com.stripe.model.Charge;
//import com.stripe.param.ChargeCreateParams;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.param.ChargeCreateParams;
import org.example.controller.model.SinglePaymentDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/stripe")
public class StripeController {
    @Value( "${stripe.api.key}")
    private String apiKey;
    @RequestMapping(value = "/create-payment-intent", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> chargeCard(@RequestBody SinglePaymentDTO singlePaymentDTO) throws StripeException {
        ChargeCreateParams params =
                ChargeCreateParams.builder()
                        .setAmount(singlePaymentDTO.getAmount())
                        .setCurrency(singlePaymentDTO.getCurrency())
                        .setSource(singlePaymentDTO.getTokenId())
                        .build();
        Charge charge = Charge.create(params);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Payment successful!");
    }
}
