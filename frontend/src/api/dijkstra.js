import http from './http';
export const runDijkstra = async (payload) => {
    const { data } = await http.post('/api/dijkstra/run', payload);
    return data;
};
//# sourceMappingURL=dijkstra.js.map