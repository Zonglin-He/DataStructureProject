package com.example.algovis.algo.kruskal;

import com.example.algovis.algo.ds.DisjointSet;
import com.example.algovis.api.dto.EdgeInput;
import com.example.algovis.api.dto.KruskalRequest;
import com.example.algovis.api.dto.KruskalResponse;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class KruskalService {

    public KruskalResponse runWithSteps(KruskalRequest request) {
        validate(request);

        List<EdgeInput> edges = new ArrayList<>(request.getEdges());
        edges.sort(Comparator.comparingInt(EdgeInput::getWeight));

        DisjointSet disjointSet = new DisjointSet(request.getVertexCount());
        List<KruskalStep> steps = new ArrayList<>();
        List<KruskalStep.EdgeState> mstEdges = new ArrayList<>();
        int totalWeight = 0;
        int stepIndex = 0;

        for (EdgeInput edge : edges) {
            KruskalStep step = new KruskalStep();
            step.setStepIndex(stepIndex++);
            step.setCandidateEdge(toState(edge));

            boolean chosen = disjointSet.union(edge.getFrom(), edge.getTo());
            step.setChosen(chosen);
            if (chosen) {
                KruskalStep.EdgeState state = toState(edge);
                mstEdges.add(state);
                totalWeight += edge.getWeight();
            }
            step.setCurrentMstEdges(new ArrayList<>(mstEdges));
            step.setParentSnapshot(disjointSet.getParentSnapshot());
            step.setRankSnapshot(disjointSet.getRankSnapshot());
            step.setComponents(disjointSet.getComponentCount());
            steps.add(step);

            if (mstEdges.size() == request.getVertexCount() - 1) {
                break;
            }
        }

        KruskalResponse response = new KruskalResponse();
        response.setSteps(steps);
        response.setMstEdges(mstEdges);
        response.setTotalWeight(totalWeight);
        return response;
    }

    private void validate(KruskalRequest request) {
        if (request.getEdges() == null || request.getEdges().isEmpty()) {
            throw new IllegalArgumentException("边列表不能为空");
        }
        int vertexCount = request.getVertexCount();
        for (EdgeInput edge : request.getEdges()) {
            if (edge.getWeight() < 0) {
                throw new IllegalArgumentException("Kruskal 需要非负权重: " + edge.getFrom() + " -> " + edge.getTo());
            }
            if (edge.getFrom() < 0 || edge.getFrom() >= vertexCount
                || edge.getTo() < 0 || edge.getTo() >= vertexCount) {
                throw new IllegalArgumentException("边包含非法顶点 idx");
            }
        }
    }

    private KruskalStep.EdgeState toState(EdgeInput edge) {
        return new KruskalStep.EdgeState(edge.getFrom(), edge.getTo(), edge.getWeight());
    }
}
