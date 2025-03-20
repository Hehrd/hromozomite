package org.example.service;

import org.example.utils.CodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private CodeGenerator codeGenerator;

    @Autowired
    private JavaMailSender javaMailSender;
    public void sendVerificationEmail(String toEmail){
        String code = codeGenerator.generate(
                true,
                false,
                false,
                6);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("alexander.dyankov@gmail.com");
        message.setTo(toEmail);
        message.setSubject("Verification Email");
        message.setText(code);
        javaMailSender.send(message);
    }
}
