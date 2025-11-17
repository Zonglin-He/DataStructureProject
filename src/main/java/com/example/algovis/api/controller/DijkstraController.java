package com.example.algovis.api.controller;

import com.example.algovis.algo.dijkstra.DijkstraService;
import com.example.algovis.api.dto.DijkstraResponse;
import com.example.algovis.api.dto.GraphRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dijkstra")
public class DijkstraController {

    private final DijkstraService dijkstraService;

    public DijkstraController(DijkstraService dijkstraService) {
        this.dijkstraService = dijkstraService;
    }

    @PostMapping("/run")
    public DijkstraResponse run(@Valid @RequestBody GraphRequest request) {
        return dijkstraService.runWithSteps(request);
    }
}
