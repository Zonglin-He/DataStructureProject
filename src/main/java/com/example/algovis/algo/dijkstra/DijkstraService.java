package com.example.algovis.algo.dijkstra;

import com.example.algovis.api.dto.DijkstraResponse;
import com.example.algovis.api.dto.EdgeInput;
import com.example.algovis.api.dto.GraphRequest;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
public class DijkstraService {

    private static final int INF = Integer.MAX_VALUE;

    public DijkstraResponse runWithSteps(GraphRequest request) {
        validate(request);

        int n = request.getVertexCount();
        int source = request.getSource();
        List<List<Edge>> graph = buildGraph(n, request);

        int[] distance = new int[n];
        Arrays.fill(distance, INF);
        Integer[] parent = new Integer[n];
        boolean[] visited = new boolean[n];

        PriorityQueue<Node> queue = new PriorityQueue<>(Comparator.comparingInt(node -> node.distance));
        distance[source] = 0;
        queue.offer(new Node(source, 0));

        List<DijkstraStep> steps = new ArrayList<>();
        int stepIndex = 0;

        while (!queue.isEmpty()) {
            Node node = queue.poll();
            if (visited[node.vertex]) {
                continue;
            }
            visited[node.vertex] = true;

            List<DijkstraStep.RelaxOperation> relaxOperations = new ArrayList<>();
            for (Edge edge : graph.get(node.vertex)) {
                int nextVertex = edge.to;
                long newDistance = (long) node.distance + edge.weight;
                if (newDistance < distance[nextVertex]) {
                    DijkstraStep.RelaxOperation relaxOperation = new DijkstraStep.RelaxOperation();
                    relaxOperation.setFrom(node.vertex);
                    relaxOperation.setTo(nextVertex);
                    relaxOperation.setWeight(edge.weight);
                    relaxOperation.setOldDistance(distance[nextVertex] == INF ? null : distance[nextVertex]);
                    relaxOperation.setNewDistance((int) newDistance);
                    relaxOperations.add(relaxOperation);

                    distance[nextVertex] = (int) newDistance;
                    parent[nextVertex] = node.vertex;
                    queue.offer(new Node(nextVertex, distance[nextVertex]));
                }
            }

            DijkstraStep step = new DijkstraStep();
            step.setStepIndex(stepIndex++);
            step.setCurrentVertex(node.vertex);
            step.setVisitedVertices(snapshotVisited(visited));
            step.setDistance(snapshotDistance(distance));
            step.setParent(snapshotParent(parent));
            step.setRelaxOps(relaxOperations);
            steps.add(step);
        }

        DijkstraResponse response = new DijkstraResponse();
        response.setSteps(steps);
        response.setFinalDistance(snapshotDistance(distance));
        response.setFinalParent(snapshotParent(parent));
        return response;
    }

    private void validate(GraphRequest request) {
        int vertexCount = request.getVertexCount();
        if (request.getSource() == null || request.getSource() < 0 || request.getSource() >= vertexCount) {
            throw new IllegalArgumentException("source 顶点超出范围");
        }
        if (request.getEdges() == null) {
            throw new IllegalArgumentException("边列表不能为空");
        }
        for (EdgeInput edge : request.getEdges()) {
            if (edge.getFrom() < 0 || edge.getFrom() >= vertexCount || edge.getTo() < 0 || edge.getTo() >= vertexCount) {
                throw new IllegalArgumentException("边包含非法顶点 idx");
            }
            if (edge.getWeight() < 0) {
                throw new IllegalArgumentException("Dijkstra 不支持负权重: " + edge.getFrom() + " -> " + edge.getTo());
            }
        }
    }

    private List<List<Edge>> buildGraph(int vertexCount, GraphRequest request) {
        List<List<Edge>> graph = new ArrayList<>(vertexCount);
        for (int i = 0; i < vertexCount; i++) {
            graph.add(new ArrayList<>());
        }
        for (EdgeInput edge : request.getEdges()) {
            graph.get(edge.getFrom()).add(new Edge(edge.getTo(), edge.getWeight()));
            if (!request.isDirected()) {
                graph.get(edge.getTo()).add(new Edge(edge.getFrom(), edge.getWeight()));
            }
        }
        return graph;
    }

    private List<Integer> snapshotVisited(boolean[] visited) {
        List<Integer> list = new ArrayList<>();
        for (int i = 0; i < visited.length; i++) {
            if (visited[i]) {
                list.add(i);
            }
        }
        return list;
    }

    private Map<Integer, Integer> snapshotDistance(int[] distance) {
        Map<Integer, Integer> map = new LinkedHashMap<>();
        for (int i = 0; i < distance.length; i++) {
            map.put(i, distance[i] == INF ? null : distance[i]);
        }
        return map;
    }

    private Map<Integer, Integer> snapshotParent(Integer[] parent) {
        Map<Integer, Integer> map = new LinkedHashMap<>();
        for (int i = 0; i < parent.length; i++) {
            map.put(i, parent[i]);
        }
        return map;
    }

    private record Edge(int to, int weight) {
    }

    private record Node(int vertex, int distance) {
    }
}
