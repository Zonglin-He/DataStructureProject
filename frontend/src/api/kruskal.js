import http from './http';
export const runKruskal = async (payload) => {
    const { data } = await http.post('/api/kruskal/run', payload);
    return data;
};
//# sourceMappingURL=kruskal.js.map