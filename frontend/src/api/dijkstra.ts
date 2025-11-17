import http from './http';
import type { EdgeInput } from '../types/graph';

export interface GraphRequest {
  vertexCount: number;
  directed: boolean;
  source: number;
  edges: EdgeInput[];
}

export interface RelaxOperation {
  from: number;
  to: number;
  weight: number;
  oldDistance: number | null;
  newDistance: number | null;
}

export interface DijkstraStep {
  stepIndex: number;
  currentVertex: number;
  visitedVertices: number[];
  distance: Record<number, number | null>;
  parent: Record<number, number | null>;
  relaxOps: RelaxOperation[];
}

export interface DijkstraResponse {
  steps: DijkstraStep[];
  finalDistance: Record<number, number | null>;
  finalParent: Record<number, number | null>;
}

export const runDijkstra = async (payload: GraphRequest) => {
  const { data } = await http.post<DijkstraResponse>('/api/dijkstra/run', payload);
  return data;
};
