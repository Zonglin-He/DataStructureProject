package com.example.algovis.api.controller;

import com.example.algovis.algo.kruskal.KruskalService;
import com.example.algovis.api.dto.KruskalRequest;
import com.example.algovis.api.dto.KruskalResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/kruskal")
public class KruskalController {

    private final KruskalService kruskalService;

    public KruskalController(KruskalService kruskalService) {
        this.kruskalService = kruskalService;
    }

    @PostMapping("/run")
    public KruskalResponse run(@Valid @RequestBody KruskalRequest request) {
        return kruskalService.runWithSteps(request);
    }
}
