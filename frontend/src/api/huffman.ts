import http from './http';

export interface HuffmanRequest {
  text: string;
}

export interface HuffmanNodeDTO {
  id: string;
  charValue: string | null;
  frequency: number;
  leftId?: string | null;
  rightId?: string | null;
  code?: string | null;
}

export interface HuffmanResponse {
  nodes: HuffmanNodeDTO[];
  codes: Record<string, string>;
  encodedBits: string;
  originalBits: number;
  compressedBits: number;
}

export const encodeHuffman = async (payload: HuffmanRequest) => {
  const { data } = await http.post<HuffmanResponse>('/api/huffman/encode', payload);
  return data;
};
