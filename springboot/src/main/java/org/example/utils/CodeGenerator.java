package org.example.utils;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class CodeGenerator {
    public static final int ASCII_CODE_DIGIT_START = 48;
    public static final int ASCII_CODE_LOWER_CASE_LETTER_START = 97;
    public static final int ASCII_CODE_UPPER_CASE_LETTER_START = 65;
    private int MIN_CODE_LENGTH = 4;
    private int MAX_CODE_LENGTH = 128;
    private int DIGITS_COUNT = 10;
    private int LOWER_CASE_LETTERS_COUNT = 26;
    private int UPPER_CASE_LETTERS_COUNT = 26;
    private Random random = new Random();

    public String generate(boolean digits, boolean lowerCaseLetters, boolean upperCaseLetters, int length) {
        if (length < MIN_CODE_LENGTH || length > MAX_CODE_LENGTH) {
            throw new RuntimeException("Invalid code length! The code must be between 4 and 128 symbols!");
        }
        StringBuilder sbCode = new StringBuilder();
        int allowedAsciiCodePoints[] = prepareAllowedAsciiCodePointsArray(digits, lowerCaseLetters, upperCaseLetters);
        for (int i = 0; i < length; i++) {
            int randomCodePointIndex = random.nextInt(0, allowedAsciiCodePoints.length);
            int asciiCodePoint = allowedAsciiCodePoints[randomCodePointIndex];
            sbCode.appendCodePoint(asciiCodePoint);
        }
        return sbCode.toString();
    }

    private int[] prepareAllowedAsciiCodePointsArray(boolean digits, boolean lowerCaseLetters, boolean upperCaseLetters) {
        int count = calculateSymbolCount(digits, lowerCaseLetters, upperCaseLetters);
        int codePoints[] = new int[count];
        int currentCodePointsIndex = 0;
        if(digits) {
            currentCodePointsIndex =
                    fillCodePointsArrayForSymbolType(currentCodePointsIndex, codePoints, ASCII_CODE_DIGIT_START, DIGITS_COUNT);
        }
        if(upperCaseLetters) {
            currentCodePointsIndex =
                    fillCodePointsArrayForSymbolType(currentCodePointsIndex, codePoints, ASCII_CODE_UPPER_CASE_LETTER_START, UPPER_CASE_LETTERS_COUNT);
        }
        if(lowerCaseLetters) {
            currentCodePointsIndex =
                    fillCodePointsArrayForSymbolType(currentCodePointsIndex, codePoints, ASCII_CODE_LOWER_CASE_LETTER_START, LOWER_CASE_LETTERS_COUNT);
        }
        return codePoints;
    }

    private int fillCodePointsArrayForSymbolType(
            int currentCodePointsIndex,
            int[] codePoints,
            int asciiStartIndex,
            int count) {
        int index = currentCodePointsIndex;
        for (int i=asciiStartIndex; i < asciiStartIndex + count; i++) {
            codePoints[index] = i;
            index++;
        }
        return index;
    }

    private int calculateSymbolCount(boolean digits, boolean lowerCaseLetters, boolean upperCaseLetters) {
        return
                (digits ? DIGITS_COUNT : 0) +
                        (lowerCaseLetters ? LOWER_CASE_LETTERS_COUNT : 0) +
                        (upperCaseLetters ? UPPER_CASE_LETTERS_COUNT : 0);
    }

//    public static void main(String[] args) {
//        CodeGenerator cg = new CodeGenerator();
//        for (int i = 0; i < 10; i++) {
//            String code = cg.generate(true, true, true, 10);
//            System.out.println("Code: " + code);
//        }
//        System.out.println("-------------------------------------------------------------------------");
//        for (int i = 0; i < 10; i++) {
//            String code = cg.generate(true, false, false, 10);
//            System.out.println("Code: " + code);
//        }
//        System.out.println("-------------------------------------------------------------------------");
//        for (int i = 0; i < 10; i++) {
//            String code = cg.generate(false, true, false, 10);
//            System.out.println("Code: " + code);
//        }
//        System.out.println("-------------------------------------------------------------------------");
//        for (int i = 0; i < 10; i++) {
//            String code = cg.generate(false, false, true, 10);
//            System.out.println("Code: " + code);
//        }
//    }
}
