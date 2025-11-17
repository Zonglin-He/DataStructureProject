package com.example.algovis.algo.ds;

public class DisjointSet {

    private final int[] parent;
    private final int[] rank;
    private int components;

    public DisjointSet(int size) {
        this.parent = new int[size];
        this.rank = new int[size];
        this.components = size;
        for (int i = 0; i < size; i++) {
            parent[i] = i;
        }
    }

    public int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    public boolean union(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        if (rootX == rootY) {
            return false;
        }
        if (rank[rootX] < rank[rootY]) {
            int temp = rootX;
            rootX = rootY;
            rootY = temp;
        }
        parent[rootY] = rootX;
        if (rank[rootX] == rank[rootY]) {
            rank[rootX]++;
        }
        components--;
        return true;
    }

    public int[] getParentSnapshot() {
        return parent.clone();
    }

    public int[] getRankSnapshot() {
        return rank.clone();
    }

    public int getComponentCount() {
        return components;
    }
}
