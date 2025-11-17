package com.example.algovis.api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public class KruskalRequest {

    @Min(value = 1, message = "图中至少需要 1 个顶点")
    private int vertexCount;

    @NotEmpty(message = "边列表不能为空")
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
