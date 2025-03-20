package org.example.exception;

public class EmailAlreadyInUseException extends Exception {
    public EmailAlreadyInUseException(String message) {
        super(message);
    }
}
