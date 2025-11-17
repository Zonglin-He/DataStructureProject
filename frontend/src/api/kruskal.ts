import http from './http';
import type { EdgeInput } from '../types/graph';

export interface KruskalRequest {
  vertexCount: number;
  edges: EdgeInput[];
}

export interface KruskalStep {
  stepIndex: number;
  candidateEdge: EdgeInput;
  chosen: boolean;
  currentMstEdges: EdgeInput[];
  parentSnapshot: number[];
  rankSnapshot: number[];
  components: number;
}

export interface KruskalResponse {
  steps: KruskalStep[];
  mstEdges: EdgeInput[];
  totalWeight: number;
}

export const runKruskal = async (payload: KruskalRequest) => {
  const { data } = await http.post<KruskalResponse>('/api/kruskal/run', payload);
  return data;
};
