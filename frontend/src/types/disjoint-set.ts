export interface DisjointSetNode {
  vertex: number;
  parent: number;
  rank: number;
  children: DisjointSetNode[];
}
