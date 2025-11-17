package com.example.algovis.api.dto;

import jakarta.validation.constraints.NotBlank;

public class HuffmanRequest {

    @NotBlank(message = "文本不能为空")
    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
