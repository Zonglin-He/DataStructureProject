import { computed } from 'vue';
const size = 420;
const props = defineProps();
const nodes = computed(() => {
    const radius = size / 2 - 40;
    const center = size / 2;
    return Array.from({ length: props.vertexCount }, (_, idx) => {
        const angle = (2 * Math.PI * idx) / props.vertexCount;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        const visited = props.step?.visitedVertices?.includes(idx);
        const current = props.step?.currentVertex === idx;
        return {
            id: idx,
            x,
            y,
            r: current ? 22 : 18,
            state: current ? 'current' : visited ? 'visited' : 'idle'
        };
    });
});
const relaxPairs = computed(() => new Set((props.step?.relaxOps ?? []).map(op => `${op.from}-${op.to}`)));
const highlightMap = computed(() => {
    const map = new Map();
    (props.highlightEdges ?? []).forEach(edge => {
        map.set(`${edge.from}-${edge.to}`, edge.state);
        map.set(`${edge.to}-${edge.from}`, edge.state);
    });
    return map;
});
const decoratedEdges = computed(() => {
    const nodesById = Object.fromEntries(nodes.value.map(node => [node.id, node]));
    return props.edges.map((edge, idx) => {
        const from = nodesById[edge.from];
        const to = nodesById[edge.to];
        const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
        const key = `${edge.from}-${edge.to}`;
        const state = highlightMap.value.get(key) ?? (relaxPairs.value.has(key) ? 'relax' : 'idle');
        return { id: idx, from, to, mid, weight: edge.weight, state };
    });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['edge']} */ ;
/** @type {__VLS_StyleScopedClasses['edge']} */ ;
/** @type {__VLS_StyleScopedClasses['edge']} */ ;
/** @type {__VLS_StyleScopedClasses['node']} */ ;
/** @type {__VLS_StyleScopedClasses['node']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "graph" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
    width: (__VLS_ctx.size),
    height: (__VLS_ctx.size),
});
for (const [edge] of __VLS_getVForSourceType((__VLS_ctx.decoratedEdges))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.g, __VLS_intrinsicElements.g)({
        key: (edge.id),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.line)({
        x1: (edge.from.x),
        y1: (edge.from.y),
        x2: (edge.to.x),
        y2: (edge.to.y),
        ...{ class: (['edge', edge.state]) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.text, __VLS_intrinsicElements.text)({
        x: (edge.mid.x),
        y: (edge.mid.y),
        ...{ class: "weight" },
    });
    (edge.weight);
}
for (const [node] of __VLS_getVForSourceType((__VLS_ctx.nodes))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.g, __VLS_intrinsicElements.g)({
        key: (node.id),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.circle)({
        cx: (node.x),
        cy: (node.y),
        r: (node.r),
        ...{ class: (['node', node.state]) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.text, __VLS_intrinsicElements.text)({
        x: (node.x),
        y: (node.y),
        ...{ class: "label" },
    });
    (node.id);
}
/** @type {__VLS_StyleScopedClasses['graph']} */ ;
/** @type {__VLS_StyleScopedClasses['weight']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            size: size,
            nodes: nodes,
            decoratedEdges: decoratedEdges,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=GraphCanvas.vue.js.map