package com.example.algovis.api.dto;

import com.example.algovis.algo.dijkstra.DijkstraStep;
import java.util.List;
import java.util.Map;

public class DijkstraResponse {

    private List<DijkstraStep> steps;
    private Map<Integer, Integer> finalDistance;
    private Map<Integer, Integer> finalParent;

    public List<DijkstraStep> getSteps() {
        return steps;
    }

    public void setSteps(List<DijkstraStep> steps) {
        this.steps = steps;
    }

    public Map<Integer, Integer> getFinalDistance() {
        return finalDistance;
    }

    public void setFinalDistance(Map<Integer, Integer> finalDistance) {
        this.finalDistance = finalDistance;
    }

    public Map<Integer, Integer> getFinalParent() {
        return finalParent;
    }

    public void setFinalParent(Map<Integer, Integer> finalParent) {
        this.finalParent = finalParent;
    }
}
