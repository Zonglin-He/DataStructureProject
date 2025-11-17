package com.example.algovis.api.dto;

import java.util.List;
import java.util.Map;

public class HuffmanResponse {

    private List<NodeDTO> nodes;
    private Map<String, String> codes;
    private String encodedBits;
    private int originalBits;
    private int compressedBits;

    public List<NodeDTO> getNodes() {
        return nodes;
    }

    public void setNodes(List<NodeDTO> nodes) {
        this.nodes = nodes;
    }

    public Map<String, String> getCodes() {
        return codes;
    }

    public void setCodes(Map<String, String> codes) {
        this.codes = codes;
    }

    public String getEncodedBits() {
        return encodedBits;
    }

    public void setEncodedBits(String encodedBits) {
        this.encodedBits = encodedBits;
    }

    public int getOriginalBits() {
        return originalBits;
    }

    public void setOriginalBits(int originalBits) {
        this.originalBits = originalBits;
    }

    public int getCompressedBits() {
        return compressedBits;
    }

    public void setCompressedBits(int compressedBits) {
        this.compressedBits = compressedBits;
    }

    public static class NodeDTO {
        private String id;
        private String charValue;
        private int frequency;
        private String leftId;
        private String rightId;
        private String code;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getCharValue() {
            return charValue;
        }

        public void setCharValue(String charValue) {
            this.charValue = charValue;
        }

        public int getFrequency() {
            return frequency;
        }

        public void setFrequency(int frequency) {
            this.frequency = frequency;
        }

        public String getLeftId() {
            return leftId;
        }

        public void setLeftId(String leftId) {
            this.leftId = leftId;
        }

        public String getRightId() {
            return rightId;
        }

        public void setRightId(String rightId) {
            this.rightId = rightId;
        }

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }
    }
}
