package org.example.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.transaction.Transactional;
import org.example.controller.model.PaymentRequest;
import org.example.exception.UserNotFoundException;
import org.example.persistence.model.TransactionEntity;
import org.example.persistence.repository.TransactionRepository;
import org.example.persistence.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StripeService {
    @Value( "${stripe.api.key}")
    private String apiKey;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserAccountRepository userAccountRepository;

    public Map<String, Object> chargeCustomer(String sessionString, PaymentRequest request) throws StripeException, UserNotFoundException {
        Stripe.apiKey = apiKey;

        PaymentIntentCreateParams createParams = createParams(request);
        PaymentIntent paymentIntent = PaymentIntent.create(createParams);
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("clientSecret", paymentIntent.getClientSecret());
        TransactionEntity transactionEntity = new TransactionEntity();
        transactionEntity.setAmount(request.getAmount());
        transactionEntity.setCurrency(request.getCurrency());
        transactionEntity.setUser(userAccountRepository.findBySession_SessionString(sessionString).orElseThrow(()-> new UserNotFoundException("User not found!")));
        saveTransaction(transactionEntity);
        return responseData;
    }

    private PaymentIntentCreateParams createParams(PaymentRequest request){
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
        return createParams;
    }
    protected void saveTransaction(TransactionEntity transactionEntity){
        transactionRepository.save(transactionEntity);
    }
}
