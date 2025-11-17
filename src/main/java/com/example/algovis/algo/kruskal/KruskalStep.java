package com.example.algovis.algo.kruskal;

import java.util.List;

public class KruskalStep {

    private int stepIndex;
    private EdgeState candidateEdge;
    private boolean chosen;
    private List<EdgeState> currentMstEdges;
    private int[] parentSnapshot;
    private int[] rankSnapshot;
    private int components;

    public int getStepIndex() {
        return stepIndex;
    }

    public void setStepIndex(int stepIndex) {
        this.stepIndex = stepIndex;
    }

    public EdgeState getCandidateEdge() {
        return candidateEdge;
    }

    public void setCandidateEdge(EdgeState candidateEdge) {
        this.candidateEdge = candidateEdge;
    }

    public boolean isChosen() {
        return chosen;
    }

    public void setChosen(boolean chosen) {
        this.chosen = chosen;
    }

    public List<EdgeState> getCurrentMstEdges() {
        return currentMstEdges;
    }

    public void setCurrentMstEdges(List<EdgeState> currentMstEdges) {
        this.currentMstEdges = currentMstEdges;
    }

    public int[] getParentSnapshot() {
        return parentSnapshot;
    }

    public void setParentSnapshot(int[] parentSnapshot) {
        this.parentSnapshot = parentSnapshot;
    }

    public int[] getRankSnapshot() {
        return rankSnapshot;
    }

    public void setRankSnapshot(int[] rankSnapshot) {
        this.rankSnapshot = rankSnapshot;
    }

    public int getComponents() {
        return components;
    }

    public void setComponents(int components) {
        this.components = components;
    }

    public static class EdgeState {
        private int from;
        private int to;
        private int weight;

        public EdgeState() {
        }

        public EdgeState(int from, int to, int weight) {
            this.from = from;
            this.to = to;
            this.weight = weight;
        }

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
}
