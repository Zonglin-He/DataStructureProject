package com.example.algovis.gui;

import com.example.algovis.api.dto.HuffmanResponse.NodeDTO;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import javafx.geometry.Point2D;
import javafx.scene.Group;
import javafx.scene.control.Label;
import javafx.scene.layout.Pane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Line;
import javafx.scene.shape.Rectangle;
import javafx.scene.text.Font;

/**
 * Simple Huffman tree renderer: draws nodes in layered layout with connecting lines.
 */
public class HuffmanPane extends Pane {

    private final Group edgeGroup = new Group();
    private final Group nodeGroup = new Group();

    public HuffmanPane() {
        getChildren().addAll(edgeGroup, nodeGroup);
        setMinHeight(360);
        setStyle("-fx-background-color: #0f172a; -fx-padding: 12;");
    }

    public void renderTree(java.util.List<NodeDTO> nodes) {
        edgeGroup.getChildren().clear();
        nodeGroup.getChildren().clear();
        if (nodes == null || nodes.isEmpty()) {
            return;
        }
        Map<String, NodeDTO> map = new HashMap<>();
        Set<String> children = new HashSet<>();
        for (NodeDTO n : nodes) {
            map.put(n.getId(), n);
            if (n.getLeftId() != null) {
                children.add(n.getLeftId());
            }
            if (n.getRightId() != null) {
                children.add(n.getRightId());
            }
        }
        String rootId = null;
        for (String id : map.keySet()) {
            if (!children.contains(id)) {
                rootId = id;
                break;
            }
        }
        if (rootId == null) {
            return;
        }

        Map<String, Point2D> positions = new HashMap<>();
        double levelHeight = 90;
        double[] cursorX = new double[]{40};
        double[] minX = new double[]{Double.MAX_VALUE};
        double[] maxX = new double[]{Double.MIN_VALUE};
        double[] maxY = new double[]{0};
        assignPositions(map, rootId, 0, cursorX, positions, levelHeight, minX, maxX, maxY);
        double width = maxX[0] - minX[0] + 160;
        setPrefWidth(Math.max(width, 800));
        setMinWidth(600);
        setPrefHeight(maxY[0] + 120);

        for (NodeDTO n : nodes) {
            if (n.getLeftId() != null) {
                drawEdge(n.getId(), n.getLeftId(), positions);
            }
            if (n.getRightId() != null) {
                drawEdge(n.getId(), n.getRightId(), positions);
            }
        }
        for (NodeDTO n : nodes) {
            drawNode(n, positions);
        }
    }

    private double assignPositions(Map<String, NodeDTO> map, String id, int depth,
        double[] cursorX, Map<String, Point2D> positions, double levelHeight,
        double[] minX, double[] maxX, double[] maxY) {
        NodeDTO node = map.get(id);
        if (node == null) {
            return 0;
        }
        double leftWidth = 0;
        double rightWidth = 0;
        if (node.getLeftId() != null) {
            leftWidth = assignPositions(map, node.getLeftId(), depth + 1, cursorX, positions, levelHeight, minX, maxX, maxY);
        }
        if (node.getRightId() != null) {
            rightWidth = assignPositions(map, node.getRightId(), depth + 1, cursorX, positions, levelHeight, minX, maxX, maxY);
        }

        double x;
        if (node.getLeftId() == null && node.getRightId() == null) {
            x = cursorX[0];
            cursorX[0] += 90;
        } else {
            double leftX = node.getLeftId() != null ? positions.get(node.getLeftId()).getX() : cursorX[0];
            double rightX = node.getRightId() != null ? positions.get(node.getRightId()).getX() : cursorX[0];
            x = (leftX + rightX) / 2.0;
        }
        double y = 40 + depth * levelHeight;
        positions.put(id, new Point2D(x, y));
        minX[0] = Math.min(minX[0], x);
        maxX[0] = Math.max(maxX[0], x);
        maxY[0] = Math.max(maxY[0], y);
        return Math.max(leftWidth + rightWidth, 90);
    }

    private void drawEdge(String fromId, String toId, Map<String, Point2D> positions) {
        Point2D p1 = positions.get(fromId);
        Point2D p2 = positions.get(toId);
        if (p1 == null || p2 == null) {
            return;
        }
        Line line = new Line(p1.getX(), p1.getY(), p2.getX(), p2.getY());
        line.setStroke(Color.web("#cbd5e1"));
        line.setStrokeWidth(1.6);
        edgeGroup.getChildren().add(line);
    }

    private void drawNode(NodeDTO node, Map<String, Point2D> positions) {
        Point2D p = positions.get(node.getId());
        if (p == null) {
            return;
        }
        double w = 70;
        double h = 42;
        Rectangle box = new Rectangle(p.getX() - w / 2, p.getY() - h / 2, w, h);
        box.setArcWidth(12);
        box.setArcHeight(12);
        box.setFill(Color.web("#1f2937"));
        box.setStroke(Color.web("#38bdf8"));
        box.setStrokeWidth(1.6);
        nodeGroup.getChildren().add(box);

        String text = (node.getCharValue() == null ? "#" : node.getCharValue())
            + " | " + node.getFrequency()
            + (node.getCode() != null ? " | " + node.getCode() : "");
        Label label = new Label(text);
        label.setTextFill(Color.WHITE);
        label.setFont(Font.font(12));
        label.setLayoutX(p.getX() - w / 2 + 6);
        label.setLayoutY(p.getY() - h / 2 + 10);
        nodeGroup.getChildren().add(label);
    }
}
