package com.example.algovis.gui;

import com.example.algovis.algo.dijkstra.DijkstraService;
import com.example.algovis.algo.huffman.HuffmanService;
import com.example.algovis.algo.kruskal.KruskalService;
import com.example.algovis.algo.dijkstra.DijkstraStep;
import com.example.algovis.algo.kruskal.KruskalStep;
import com.example.algovis.api.dto.DijkstraResponse;
import com.example.algovis.api.dto.EdgeInput;
import com.example.algovis.api.dto.GraphRequest;
import com.example.algovis.api.dto.HuffmanRequest;
import com.example.algovis.api.dto.HuffmanResponse;
import com.example.algovis.api.dto.KruskalRequest;
import com.example.algovis.api.dto.KruskalResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.scene.control.CheckBox;
import javafx.scene.control.Label;
import javafx.scene.control.Tab;
import javafx.scene.control.TabPane;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import javafx.scene.control.ScrollPane;

public class AlgoVisGuiApp extends Application {

    private final DijkstraService dijkstraService = new DijkstraService();
    private final KruskalService kruskalService = new KruskalService();
    private final HuffmanService huffmanService = new HuffmanService();

    @Override
    public void start(Stage stage) {
        TabPane tabs = new TabPane();
        tabs.getTabs().add(buildDijkstraTab());
        tabs.getTabs().add(buildKruskalTab());
        tabs.getTabs().add(buildHuffmanTab());

        Scene scene = new Scene(tabs, 1000, 720);
        stage.setTitle("AlgoVis Desktop");
        stage.setScene(scene);
        stage.show();
    }

    private Tab buildDijkstraTab() {
        TextField vertexField = new TextField("5");
        TextField sourceField = new TextField("0");
        CheckBox directedBox = new CheckBox("Directed graph");
        TextArea edgesArea = new TextArea("""
0 1 2
0 2 5
1 2 1
1 3 3
2 3 1
3 4 2""");
        TextArea outputArea = createOutputArea();
        GraphPane graphPane = new GraphPane();
        graphPane.setPrefHeight(420);

        final List<DijkstraStep>[] stepsHolder = new List[]{null};
        final int[] index = {0};

        Button runButton = new Button("Run Dijkstra");
        runButton.setOnAction(event -> {
            try {
                GraphRequest request = new GraphRequest();
                request.setVertexCount(parseInt(vertexField, "vertex count"));
                request.setSource(parseInt(sourceField, "source"));
                request.setDirected(directedBox.isSelected());
                request.setEdges(parseEdges(edgesArea.getText()));

                DijkstraResponse response = dijkstraService.runWithSteps(request);
                outputArea.setText(formatDijkstra(response));
                stepsHolder[0] = response.getSteps();
                index[0] = 0;
                graphPane.setGraph(request.getVertexCount(), request.getEdges(), request.isDirected());
                if (!stepsHolder[0].isEmpty()) {
                    graphPane.highlightDijkstra(stepsHolder[0].get(0));
                }
            } catch (Exception ex) {
                showError(ex.getMessage());
            }
        });

        Button prevButton = new Button("< Prev");
        Button nextButton = new Button("Next >");
        Label stepLabel = new Label("Step: - / -");

        prevButton.setOnAction(e -> {
            if (stepsHolder[0] == null || stepsHolder[0].isEmpty()) {
                return;
            }
            index[0] = Math.max(0, index[0] - 1);
            stepLabel.setText("Step: " + index[0] + " / " + (stepsHolder[0].size() - 1));
            graphPane.highlightDijkstra(stepsHolder[0].get(index[0]));
        });
        nextButton.setOnAction(e -> {
            if (stepsHolder[0] == null || stepsHolder[0].isEmpty()) {
                return;
            }
            index[0] = Math.min(stepsHolder[0].size() - 1, index[0] + 1);
            stepLabel.setText("Step: " + index[0] + " / " + (stepsHolder[0].size() - 1));
            graphPane.highlightDijkstra(stepsHolder[0].get(index[0]));
        });

        VBox content = new VBox(12,
            buildForm("Vertex count", vertexField),
            buildForm("Source vertex", sourceField),
            directedBox,
            buildLabeledArea("Edges (one per line: from to weight)", edgesArea),
            runButton,
            buildLabeledArea("Output", outputArea),
            new VBox(8, graphPane, new HBox(10, prevButton, nextButton, stepLabel))
        );
        VBox.setVgrow(graphPane, Priority.ALWAYS);
        content.setPadding(new Insets(14));

        Tab tab = new Tab("Dijkstra", wrap(content));
        tab.setClosable(false);
        return tab;
    }

    private Tab buildKruskalTab() {
        TextField vertexField = new TextField("5");
        TextArea edgesArea = new TextArea("""
0 1 1
0 2 4
1 2 2
1 3 5
2 3 1
3 4 3""");
        TextArea outputArea = createOutputArea();
        GraphPane graphPane = new GraphPane();
        graphPane.setPrefHeight(420);

        final List<KruskalStep>[] stepsHolder = new List[]{null};
        final int[] index = {0};

        Button runButton = new Button("Run Kruskal");
        runButton.setOnAction(event -> {
            try {
                KruskalRequest request = new KruskalRequest();
                request.setVertexCount(parseInt(vertexField, "vertex count"));
                request.setEdges(parseEdges(edgesArea.getText()));

                KruskalResponse response = kruskalService.runWithSteps(request);
                outputArea.setText(formatKruskal(response));
                stepsHolder[0] = response.getSteps();
                index[0] = 0;
                graphPane.setGraph(request.getVertexCount(), request.getEdges(), false);
                if (!stepsHolder[0].isEmpty()) {
                    graphPane.highlightKruskal(stepsHolder[0].get(0));
                }
            } catch (Exception ex) {
                showError(ex.getMessage());
            }
        });

        Button prevButton = new Button("< Prev");
        Button nextButton = new Button("Next >");
        Label stepLabel = new Label("Step: - / -");
        prevButton.setOnAction(e -> {
            if (stepsHolder[0] == null || stepsHolder[0].isEmpty()) {
                return;
            }
            index[0] = Math.max(0, index[0] - 1);
            stepLabel.setText("Step: " + index[0] + " / " + (stepsHolder[0].size() - 1));
            graphPane.highlightKruskal(stepsHolder[0].get(index[0]));
        });
        nextButton.setOnAction(e -> {
            if (stepsHolder[0] == null || stepsHolder[0].isEmpty()) {
                return;
            }
            index[0] = Math.min(stepsHolder[0].size() - 1, index[0] + 1);
            stepLabel.setText("Step: " + index[0] + " / " + (stepsHolder[0].size() - 1));
            graphPane.highlightKruskal(stepsHolder[0].get(index[0]));
        });

        VBox content = new VBox(12,
            buildForm("Vertex count", vertexField),
            buildLabeledArea("Edges (one per line: from to weight)", edgesArea),
            runButton,
            buildLabeledArea("Output", outputArea),
            new VBox(8, graphPane, new HBox(10, prevButton, nextButton, stepLabel))
        );
        VBox.setVgrow(graphPane, Priority.ALWAYS);
        content.setPadding(new Insets(14));

        Tab tab = new Tab("Kruskal", wrap(content));
        tab.setClosable(false);
        return tab;
    }

    private Tab buildHuffmanTab() {
        TextArea inputArea = new TextArea("hello huffman");
        inputArea.setPrefRowCount(4);
        TextArea outputArea = createOutputArea();
        HuffmanPane huffmanPane = new HuffmanPane();
        huffmanPane.setPrefHeight(420);
        ScrollPane scroll = new ScrollPane(huffmanPane);
        scroll.setFitToWidth(true);
        scroll.setPannable(true);
        scroll.setStyle("-fx-background: #0f172a;");

        Button runButton = new Button("Generate codes");
        runButton.setOnAction(event -> {
            try {
                HuffmanRequest request = new HuffmanRequest();
                request.setText(inputArea.getText());

                HuffmanResponse response = huffmanService.encode(request);
                outputArea.setText(formatHuffman(response));
                huffmanPane.renderTree(response.getNodes());
            } catch (Exception ex) {
                showError(ex.getMessage());
            }
        });

        VBox content = new VBox(12,
            buildLabeledArea("Input text", inputArea),
            runButton,
            buildLabeledArea("Output", outputArea),
            scroll
        );
        VBox.setVgrow(scroll, Priority.ALWAYS);
        content.setPadding(new Insets(14));

        Tab tab = new Tab("Huffman", wrap(content));
        tab.setClosable(false);
        return tab;
    }

    private VBox wrap(VBox content) {
        VBox wrapper = new VBox(content);
        wrapper.setAlignment(Pos.TOP_LEFT);
        return wrapper;
    }

    private TextArea createOutputArea() {
        TextArea area = new TextArea();
        area.setEditable(false);
        area.setPrefRowCount(16);
        return area;
    }

    private HBox buildForm(String label, TextField field) {
        Label l = new Label(label + ": ");
        l.setMinWidth(90);
        HBox box = new HBox(10, l, field);
        box.setAlignment(Pos.CENTER_LEFT);
        return box;
    }

    private VBox buildLabeledArea(String label, TextArea area) {
        Label l = new Label(label + ": ");
        return new VBox(6, l, area);
    }

    private int parseInt(TextField field, String name) {
        String text = field.getText();
        if (text == null || text.isBlank()) {
            throw new IllegalArgumentException(name + " cannot be empty");
        }
        try {
            return Integer.parseInt(text.trim());
        } catch (NumberFormatException ex) {
            throw new IllegalArgumentException(name + " must be an integer");
        }
    }

    private List<EdgeInput> parseEdges(String raw) {
        List<EdgeInput> edges = new ArrayList<>();
        String[] lines = raw.split("\\r?\\n");
        for (String line : lines) {
            String trimmed = line.trim();
            if (trimmed.isEmpty()) {
                continue;
            }
            String[] parts = trimmed.split("[,\\s]+");
            if (parts.length < 3) {
                throw new IllegalArgumentException("Edge format needs \"from to weight\", got: " + line);
            }
            try {
                int from = Integer.parseInt(parts[0]);
                int to = Integer.parseInt(parts[1]);
                int weight = Integer.parseInt(parts[2]);

                EdgeInput edge = new EdgeInput();
                edge.setFrom(from);
                edge.setTo(to);
                edge.setWeight(weight);
                edges.add(edge);
            } catch (NumberFormatException ex) {
                throw new IllegalArgumentException("Failed to parse edge: " + line);
            }
        }
        if (edges.isEmpty()) {
            throw new IllegalArgumentException("Please input at least one edge");
        }
        return edges;
    }

    private String formatDijkstra(DijkstraResponse response) {
        StringBuilder sb = new StringBuilder();
        sb.append("Final distance: ").append(response.getFinalDistance()).append(System.lineSeparator());
        sb.append("Final parent: ").append(response.getFinalParent()).append(System.lineSeparator());
        sb.append(System.lineSeparator());

        for (var step : response.getSteps()) {
            sb.append("Step ").append(step.getStepIndex()).append(" | Current vertex: ")
                .append(step.getCurrentVertex()).append(System.lineSeparator());
            sb.append("Visited: ").append(step.getVisitedVertices()).append(System.lineSeparator());
            sb.append("Distance: ").append(step.getDistance()).append(System.lineSeparator());
            sb.append("Parent: ").append(step.getParent()).append(System.lineSeparator());
            if (step.getRelaxOps() != null && !step.getRelaxOps().isEmpty()) {
                sb.append("Relax:").append(System.lineSeparator());
                for (var op : step.getRelaxOps()) {
                    sb.append("  ").append(op.getFrom()).append(" -> ").append(op.getTo())
                        .append(" w=").append(op.getWeight())
                        .append(" old=").append(op.getOldDistance())
                        .append(" new=").append(op.getNewDistance())
                        .append(System.lineSeparator());
                }
            }
            sb.append(System.lineSeparator());
        }
        return sb.toString();
    }

    private String formatKruskal(KruskalResponse response) {
        StringBuilder sb = new StringBuilder();
        sb.append("MST weight: ").append(response.getTotalWeight()).append(System.lineSeparator());
        sb.append("MST edges: ").append(formatEdgeList(response.getMstEdges())).append(System.lineSeparator());
        sb.append(System.lineSeparator());

        for (var step : response.getSteps()) {
            sb.append("Step ").append(step.getStepIndex()).append(" | Candidate: ")
                .append(formatEdge(step.getCandidateEdge())).append(" | Chosen: ")
                .append(step.isChosen()).append(System.lineSeparator());
            sb.append("Current MST: ").append(formatEdgeList(step.getCurrentMstEdges())).append(System.lineSeparator());
            sb.append("Parent: ").append(formatArray(step.getParentSnapshot())).append(System.lineSeparator());
            sb.append("Rank: ").append(formatArray(step.getRankSnapshot())).append(System.lineSeparator());
            sb.append("Components: ").append(step.getComponents()).append(System.lineSeparator());
            sb.append(System.lineSeparator());
        }
        return sb.toString();
    }

    private String formatHuffman(HuffmanResponse response) {
        StringBuilder sb = new StringBuilder();
        sb.append("Code table: ").append(response.getCodes()).append(System.lineSeparator());
        sb.append("Encoded bits: ").append(response.getEncodedBits()).append(System.lineSeparator());
        sb.append("Original bits: ").append(response.getOriginalBits())
            .append(" | Compressed bits: ").append(response.getCompressedBits())
            .append(System.lineSeparator());
        sb.append(System.lineSeparator());

        if (response.getNodes() != null && !response.getNodes().isEmpty()) {
            sb.append("Tree nodes (id, char, freq, left, right, code):").append(System.lineSeparator());
            for (var node : response.getNodes()) {
                sb.append("  ").append(node.getId()).append(" | ")
                    .append(node.getCharValue()).append(" | ")
                    .append(node.getFrequency()).append(" | ")
                    .append(node.getLeftId()).append(" | ")
                    .append(node.getRightId()).append(" | ")
                    .append(node.getCode()).append(System.lineSeparator());
            }
        }
        return sb.toString();
    }

    private String formatEdge(KruskalStep.EdgeState edge) {
        if (edge == null) {
            return "null";
        }
        return "(" + edge.getFrom() + "," + edge.getTo() + "," + edge.getWeight() + ")";
    }

    private String formatEdgeList(List<KruskalStep.EdgeState> edges) {
        if (edges == null || edges.isEmpty()) {
            return "[]";
        }
        return edges.stream().map(this::formatEdge).collect(Collectors.joining(", ", "[", "]"));
    }

    private String formatArray(int[] arr) {
        if (arr == null) {
            return "null";
        }
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < arr.length; i++) {
            sb.append(arr[i]);
            if (i < arr.length - 1) {
                sb.append(", ");
            }
        }
        sb.append("]");
        return sb.toString();
    }

    private void showError(String message) {
        Alert alert = new Alert(Alert.AlertType.ERROR);
        alert.setTitle("Input or execution error");
        alert.setHeaderText(null);
        alert.setContentText(message);
        alert.showAndWait();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
