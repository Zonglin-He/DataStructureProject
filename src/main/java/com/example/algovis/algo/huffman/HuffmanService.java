package com.example.algovis.algo.huffman;

import com.example.algovis.api.dto.HuffmanRequest;
import com.example.algovis.api.dto.HuffmanResponse;
import com.example.algovis.api.dto.HuffmanResponse.NodeDTO;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.concurrent.atomic.AtomicInteger;
public class HuffmanService {

    public HuffmanResponse encode(HuffmanRequest request) {
        String text = request.getText();
        if (text == null || text.isEmpty()) {
            throw new IllegalArgumentException("文本不能为空");
        }

        Map<Character, Integer> freq = buildFrequency(text);
        TreeNode root = buildTree(freq);
        Map<Character, String> codes = new LinkedHashMap<>();
        buildCodes(root, "", codes);

        StringBuilder encoded = new StringBuilder();
        for (char c : text.toCharArray()) {
            encoded.append(codes.get(c));
        }

        List<NodeDTO> nodes = new ArrayList<>();
        AtomicInteger counter = new AtomicInteger();
        traverseForNodes(root, nodes, counter, codes);

        HuffmanResponse response = new HuffmanResponse();
        response.setNodes(nodes);
        response.setCodes(convertCodes(codes));
        response.setEncodedBits(encoded.toString());
        response.setOriginalBits(text.length() * 8);
        response.setCompressedBits(encoded.length());
        return response;
    }

    private Map<Character, Integer> buildFrequency(String text) {
        Map<Character, Integer> freq = new LinkedHashMap<>();
        for (char c : text.toCharArray()) {
            freq.merge(c, 1, Integer::sum);
        }
        return freq;
    }

    private TreeNode buildTree(Map<Character, Integer> freq) {
        PriorityQueue<TreeNode> queue = new PriorityQueue<>(Comparator.comparingInt(node -> node.frequency));
        for (Map.Entry<Character, Integer> entry : freq.entrySet()) {
            queue.offer(new TreeNode(entry.getKey(), entry.getValue(), null, null));
        }
        if (queue.size() == 1) {
            // 单字符文本时补一个哨兵节点，保证编码至少有 1 位
            queue.offer(new TreeNode(null, 0, null, null));
        }
        while (queue.size() > 1) {
            TreeNode left = queue.poll();
            TreeNode right = queue.poll();
            queue.offer(new TreeNode(null, left.frequency + right.frequency, left, right));
        }
        return queue.poll();
    }

    private void buildCodes(TreeNode node, String prefix, Map<Character, String> codes) {
        if (node == null) {
            return;
        }
        if (node.isLeaf()) {
            String code = prefix.isEmpty() ? "0" : prefix;
            if (node.value != null) {
                codes.put(node.value, code);
            }
            return;
        }
        buildCodes(node.left, prefix + "0", codes);
        buildCodes(node.right, prefix + "1", codes);
    }

    private void traverseForNodes(TreeNode node, List<NodeDTO> nodes, AtomicInteger counter,
        Map<Character, String> codes) {
        if (node == null) {
            return;
        }
        String id = "node-" + counter.getAndIncrement();
        node.id = id;

        NodeDTO dto = new NodeDTO();
        dto.setId(id);
        dto.setCharValue(node.value == null ? null : String.valueOf(node.value));
        dto.setFrequency(node.frequency);
        if (node.left != null) {
            traverseForNodes(node.left, nodes, counter, codes);
            dto.setLeftId(node.left.id);
        }
        if (node.right != null) {
            traverseForNodes(node.right, nodes, counter, codes);
            dto.setRightId(node.right.id);
        }
        if (node.value != null && codes.containsKey(node.value)) {
            dto.setCode(codes.get(node.value));
        }
        nodes.add(dto);
    }

    private Map<String, String> convertCodes(Map<Character, String> codes) {
        Map<String, String> map = new LinkedHashMap<>();
        for (Map.Entry<Character, String> entry : codes.entrySet()) {
            map.put(String.valueOf(entry.getKey()), entry.getValue());
        }
        return map;
    }

    private static class TreeNode {
        private final Character value;
        private final int frequency;
        private final TreeNode left;
        private final TreeNode right;
        private String id;

        private TreeNode(Character value, int frequency, TreeNode left, TreeNode right) {
            this.value = value;
            this.frequency = frequency;
            this.left = left;
            this.right = right;
        }

        private boolean isLeaf() {
            return left == null && right == null;
        }
    }
}
