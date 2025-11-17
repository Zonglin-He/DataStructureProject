package com.example.algovis.api.controller;

import com.example.algovis.algo.huffman.HuffmanService;
import com.example.algovis.api.dto.HuffmanRequest;
import com.example.algovis.api.dto.HuffmanResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/huffman")
public class HuffmanController {

    private final HuffmanService huffmanService;

    public HuffmanController(HuffmanService huffmanService) {
        this.huffmanService = huffmanService;
    }

    @PostMapping("/encode")
    public HuffmanResponse encode(@Valid @RequestBody HuffmanRequest request) {
        return huffmanService.encode(request);
    }
}
