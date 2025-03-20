package org.example.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({SessionExpiredException.class})
    public ResponseEntity<String> handleSessionExpiredException() {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("Session expired!");
    }

    @ExceptionHandler({EmailAlreadyInUseException.class})
    public ResponseEntity<String> handleEmailAlreadyInUseException() {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body("Email already in use!");
    }

    @ExceptionHandler({UserNotFoundException.class})
    public ResponseEntity<String> handleUserNotFoundException() {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("User not found!");
    }

    @ExceptionHandler({InvalidValuesException.class})
    public ResponseEntity<String> handleInvalidValuesException() {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("Invalid values!");
    }
}