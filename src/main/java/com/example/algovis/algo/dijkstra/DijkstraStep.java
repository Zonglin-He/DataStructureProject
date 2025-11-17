package com.example.algovis.algo.dijkstra;

import java.util.List;
import java.util.Map;

public class DijkstraStep {

    private int stepIndex;
    private Integer currentVertex;
    private List<Integer> visitedVertices;
    private Map<Integer, Integer> distance;
    private Map<Integer, Integer> parent;
    private List<RelaxOperation> relaxOps;

    public int getStepIndex() {
        return stepIndex;
    }

    public void setStepIndex(int stepIndex) {
        this.stepIndex = stepIndex;
    }

    public Integer getCurrentVertex() {
        return currentVertex;
    }

    public void setCurrentVertex(Integer currentVertex) {
        this.currentVertex = currentVertex;
    }

    public List<Integer> getVisitedVertices() {
        return visitedVertices;
    }

    public void setVisitedVertices(List<Integer> visitedVertices) {
        this.visitedVertices = visitedVertices;
    }

    public Map<Integer, Integer> getDistance() {
        return distance;
    }

    public void setDistance(Map<Integer, Integer> distance) {
        this.distance = distance;
    }

    public Map<Integer, Integer> getParent() {
        return parent;
    }

    public void setParent(Map<Integer, Integer> parent) {
        this.parent = parent;
    }

    public List<RelaxOperation> getRelaxOps() {
        return relaxOps;
    }

    public void setRelaxOps(List<RelaxOperation> relaxOps) {
        this.relaxOps = relaxOps;
    }

    public static class RelaxOperation {
        private int from;
        private int to;
        private Integer oldDistance;
        private Integer newDistance;
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

        public Integer getOldDistance() {
            return oldDistance;
        }

        public void setOldDistance(Integer oldDistance) {
            this.oldDistance = oldDistance;
        }

        public Integer getNewDistance() {
            return newDistance;
        }

        public void setNewDistance(Integer newDistance) {
            this.newDistance = newDistance;
        }

        public int getWeight() {
            return weight;
        }

        public void setWeight(int weight) {
            this.weight = weight;
        }
    }
}
