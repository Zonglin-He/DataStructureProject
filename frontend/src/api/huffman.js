import http from './http';
export const encodeHuffman = async (payload) => {
    const { data } = await http.post('/api/huffman/encode', payload);
    return data;
};
//# sourceMappingURL=huffman.js.map