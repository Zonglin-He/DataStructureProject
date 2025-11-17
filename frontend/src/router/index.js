import { createRouter, createWebHistory } from 'vue-router';
import DijkstraView from '../views/DijkstraView.vue';
import KruskalView from '../views/KruskalView.vue';
import HuffmanView from '../views/HuffmanView.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: { name: 'dijkstra' }
        },
        {
            path: '/dijkstra',
            name: 'dijkstra',
            component: DijkstraView
        },
        {
            path: '/kruskal',
            name: 'kruskal',
            component: KruskalView
        },
        {
            path: '/huffman',
            name: 'huffman',
            component: HuffmanView
        }
    ]
});
export default router;
//# sourceMappingURL=index.js.map