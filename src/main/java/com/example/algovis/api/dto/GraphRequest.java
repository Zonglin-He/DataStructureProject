package com.example.algovis.api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public class GraphRequest {

    @Min(value = 1, message = "图中至少需要 1 个顶点")
    private int vertexCount;

    private boolean directed;

    @NotEmpty(message = "边列表不能为空")
    private List<@Valid EdgeInput> edges;

    @NotNull(message = "Dijkstra 需要提供 source 顶点")
    @Min(value = 0, message = "source 顶点不能为负数")
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
