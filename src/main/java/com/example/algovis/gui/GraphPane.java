package com.example.algovis.gui;

import com.example.algovis.algo.dijkstra.DijkstraStep;
import com.example.algovis.algo.kruskal.KruskalStep;
import com.example.algovis.api.dto.EdgeInput;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javafx.geometry.Point2D;
import javafx.scene.Group;
import javafx.scene.control.Label;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.scene.shape.Line;
import javafx.scene.text.Font;

/**
 * Minimal graph canvas: draws nodes in a circle and edges with weight labels,
 * supports highlighting for Dijkstra and Kruskal steps.
 */
public class GraphPane extends Pane {

    private final Group edgeGroup = new Group();
    private final Group labelGroup = new Group();
    private final Group nodeGroup = new Group();

    private int vertexCount;
    private boolean directed;
    private final Map<Integer, Point2D> positions = new HashMap<>();
    private final Map<String, Line> edgeLines = new HashMap<>();
    private final Map<Integer, Circle> nodeCircles = new HashMap<>();

    private static final Color EDGE_COLOR = Color.web("#d0d6e1");
    private static final Color EDGE_HIGHLIGHT = Color.web("#f38b76");
    private static final Color EDGE_MST = Color.web("#5fbf77");
    private static final Color NODE_COLOR = Color.web("#2e6fde");
    private static final Color NODE_VISITED = Color.web("#8fb7ff");
    private static final Color NODE_CURRENT = Color.web("#ffc107");

    public GraphPane() {
        getChildren().addAll(edgeGroup, labelGroup, nodeGroup);
        setMinHeight(360);
        setStyle("-fx-background-color: #0f172a; -fx-padding: 12;");
    }

    public void setGraph(int vertexCount, List<EdgeInput> edges, boolean directed) {
        this.vertexCount = vertexCount;
        this.directed = directed;
        positions.clear();
        edgeLines.clear();
        nodeCircles.clear();
        edgeGroup.getChildren().clear();
        nodeGroup.getChildren().clear();
        labelGroup.getChildren().clear();

        double width = Math.max(getWidth(), 600);
        double height = Math.max(getHeight(), 360);
        double radius = Math.min(width, height) / 2 - 60;
        double centerX = width / 2;
        double centerY = height / 2;

        for (int i = 0; i < vertexCount; i++) {
            double angle = 2 * Math.PI * i / vertexCount;
            double x = centerX + radius * Math.cos(angle);
            double y = centerY + radius * Math.sin(angle);
            positions.put(i, new Point2D(x, y));
        }

        for (EdgeInput e : edges) {
            addEdge(e.getFrom(), e.getTo(), e.getWeight());
            if (!directed) {
                addEdge(e.getTo(), e.getFrom(), e.getWeight());
            }
        }

        for (int i = 0; i < vertexCount; i++) {
            addNode(i);
        }
    }

    public void highlightDijkstra(DijkstraStep step) {
        resetStyles();

        // visited nodes
        for (Integer v : step.getVisitedVertices()) {
            Circle c = nodeCircles.get(v);
            if (c != null) {
                c.setFill(NODE_VISITED);
            }
        }
        // current vertex
        Circle current = nodeCircles.get(step.getCurrentVertex());
        if (current != null) {
            current.setFill(NODE_CURRENT);
            current.setStroke(Color.WHITE);
            current.setStrokeWidth(2.5);
        }
        // relax edges
        if (step.getRelaxOps() != null) {
            for (var op : step.getRelaxOps()) {
                Line line = findEdge(op.getFrom(), op.getTo());
                if (line != null) {
                    line.setStroke(EDGE_HIGHLIGHT);
                    line.setStrokeWidth(3);
                }
            }
        }
    }

    public void highlightKruskal(KruskalStep step) {
        resetStyles();

        // current MST edges
        for (KruskalStep.EdgeState e : step.getCurrentMstEdges()) {
            Line line = findEdge(e.getFrom(), e.getTo());
            if (line != null) {
                line.setStroke(EDGE_MST);
                line.setStrokeWidth(3.2);
            }
        }
        // candidate edge
        KruskalStep.EdgeState candidate = step.getCandidateEdge();
        if (candidate != null) {
            Line line = findEdge(candidate.getFrom(), candidate.getTo());
            if (line != null) {
                line.setStroke(step.isChosen() ? EDGE_MST : EDGE_HIGHLIGHT);
                line.setStrokeWidth(3.5);
            }
        }
    }

    private void addEdge(int from, int to, int weight) {
        Point2D p1 = positions.get(from);
        Point2D p2 = positions.get(to);
        if (p1 == null || p2 == null) {
            return;
        }
        Line line = new Line(p1.getX(), p1.getY(), p2.getX(), p2.getY());
        line.setStroke(EDGE_COLOR);
        line.setStrokeWidth(1.5);
        edgeGroup.getChildren().add(line);
        edgeLines.put(edgeKey(from, to), line);

        Label label = new Label(String.valueOf(weight));
        label.setTextFill(Color.web("#cbd5e1"));
        label.setFont(Font.font(13));
        double midX = (p1.getX() + p2.getX()) / 2;
        double midY = (p1.getY() + p2.getY()) / 2;
        label.setLayoutX(midX);
        label.setLayoutY(midY);
        labelGroup.getChildren().add(label);
    }

    private void addNode(int idx) {
        Point2D p = positions.get(idx);
        Circle circle = new Circle(p.getX(), p.getY(), 16, NODE_COLOR);
        circle.setStroke(Color.web("#0ea5e9"));
        circle.setStrokeWidth(1.4);
        nodeGroup.getChildren().add(circle);
        nodeCircles.put(idx, circle);

        Label label = new Label(String.valueOf(idx));
        label.setTextFill(Color.WHITE);
        label.setFont(Font.font(13));
        label.setLayoutX(p.getX() - 4);
        label.setLayoutY(p.getY() - 8);
        nodeGroup.getChildren().add(label);
    }

    private void resetStyles() {
        for (Line line : edgeLines.values()) {
            line.setStroke(EDGE_COLOR);
            line.setStrokeWidth(1.5);
        }
        for (Circle c : nodeCircles.values()) {
            c.setFill(NODE_COLOR);
            c.setStroke(Color.web("#0ea5e9"));
            c.setStrokeWidth(1.4);
        }
    }

    private Line findEdge(int from, int to) {
        Line line = edgeLines.get(edgeKey(from, to));
        if (line == null && !directed) {
            line = edgeLines.get(edgeKey(to, from));
        }
        return line;
    }

    private String edgeKey(int from, int to) {
        return from + "-" + to;
    }
}
