package com.example.algovis.api.dto;

import jakarta.validation.constraints.NotBlank;

public class HuffmanRequest {

    @NotBlank(message = "Text cannot be empty")
    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
