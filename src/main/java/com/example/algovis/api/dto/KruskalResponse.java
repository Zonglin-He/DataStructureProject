package com.example.algovis.api.dto;

import com.example.algovis.algo.kruskal.KruskalStep;
import java.util.List;

public class KruskalResponse {

    private List<KruskalStep> steps;
    private List<KruskalStep.EdgeState> mstEdges;
    private int totalWeight;

    public List<KruskalStep> getSteps() {
        return steps;
    }

    public void setSteps(List<KruskalStep> steps) {
        this.steps = steps;
    }

    public List<KruskalStep.EdgeState> getMstEdges() {
        return mstEdges;
    }

    public void setMstEdges(List<KruskalStep.EdgeState> mstEdges) {
        this.mstEdges = mstEdges;
    }

    public int getTotalWeight() {
        return totalWeight;
    }

    public void setTotalWeight(int totalWeight) {
        this.totalWeight = totalWeight;
    }
}
