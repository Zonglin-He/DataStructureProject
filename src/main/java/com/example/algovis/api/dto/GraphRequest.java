package com.example.algovis.api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class GraphRequest {

    @Min(value = 1, message = "The graph must have at least 1 vertex")
    private int vertexCount;

    private boolean directed;

    @NotEmpty(message = "Edge list cannot be empty")
    private List<@Valid EdgeInput> edges;

    @NotNull(message = "Dijkstra requires a source vertex")
    @Min(value = 0, message = "source vertex cannot be negative")
    private Integer source;

    public int getVertexCount() {
        return vertexCount;
    }

    public void setVertexCount(int vertexCount) {
        this.vertexCount = vertexCount;
    }

    public boolean isDirected() {
        return directed;
    }

    public void setDirected(boolean directed) {
        this.directed = directed;
    }

    public List<EdgeInput> getEdges() {
        return edges;
    }

    public void setEdges(List<EdgeInput> edges) {
        this.edges = edges;
    }

    public Integer getSource() {
        return source;
    }

    public void setSource(Integer source) {
        this.source = source;
    }
}
