package com.example.algovis.api.dto;

import jakarta.validation.constraints.Min;

public class EdgeInput {

    @Min(value = 0, message = "from 顶点不能为负数")
    private int from;

    @Min(value = 0, message = "to 顶点不能为负数")
    private int to;

    private int weight;

    public int getFrom() {
        return from;
    }

    public void setFrom(int from) {
        this.from = from;
    }

    public int getTo() {
        return to;
    }

    public void setTo(int to) {
        this.to = to;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }
}
