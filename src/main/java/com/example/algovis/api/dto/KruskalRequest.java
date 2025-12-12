package com.example.algovis.api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public class KruskalRequest {

    @Min(value = 1, message = "The graph must have at least 1 vertex")
    private int vertexCount;

    @NotEmpty(message = "Edge list cannot be empty")
    private List<@Valid EdgeInput> edges;

    public int getVertexCount() {
        return vertexCount;
    }

    public void setVertexCount(int vertexCount) {
        this.vertexCount = vertexCount;
    }

    public List<EdgeInput> getEdges() {
        return edges;
    }

    public void setEdges(List<EdgeInput> edges) {
        this.edges = edges;
    }
}
