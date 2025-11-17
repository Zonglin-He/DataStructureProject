import { computed, ref, watch } from 'vue';
const props = defineProps();
const layout = computed(() => {
    const nodes = props.nodes ?? [];
    if (!nodes.length) {
        return { nodes: [], edges: [], width: 300, height: 200 };
    }
    const nodeMap = new Map(nodes.map(node => [node.id, node]));
    const childIds = new Set();
    nodes.forEach(node => {
        if (node.leftId)
            childIds.add(node.leftId);
        if (node.rightId)
            childIds.add(node.rightId);
    });
    const root = nodes.find(node => !childIds.has(node.id));
    if (!root) {
        return { nodes: [], edges: [], width: 300, height: 200 };
    }
    const horizontal = 90;
    const vertical = 110;
    const margin = 40;
    let currentX = 0;
    const positioned = new Map();
    const edges = [];
    let maxDepth = 0;
    const assign = (nodeId, depth) => {
        const node = nodeMap.get(nodeId);
        if (!node)
            return;
        if (node.leftId)
            assign(node.leftId, depth + 1);
        const x = margin + currentX * horizontal;
        const y = margin + depth * vertical;
        currentX++;
        positioned.set(nodeId, {
            id: nodeId,
            x,
            y,
            frequency: node.frequency,
            charValue: node.charValue ?? null
        });
        if (node.rightId)
            assign(node.rightId, depth + 1);
        maxDepth = Math.max(maxDepth, depth);
    };
    assign(root.id, 0);
    nodes.forEach(node => {
        const from = positioned.get(node.id);
        if (!from)
            return;
        if (node.leftId) {
            const to = positioned.get(node.leftId);
            if (to) {
                edges.push(createEdge(node.id + 'L', from, to, '0'));
            }
        }
        if (node.rightId) {
            const to = positioned.get(node.rightId);
            if (to) {
                edges.push(createEdge(node.id + 'R', from, to, '1'));
            }
        }
    });
    const width = Math.max(positioned.size * horizontal + margin * 2, 360);
    const height = Math.max((maxDepth + 1) * vertical + margin, 240);
    return { nodes: Array.from(positioned.values()), edges, width, height };
});
const createEdge = (id, from, to, label) => {
    const labelX = (from.x + to.x) / 2;
    const labelY = (from.y + to.y) / 2 - 8;
    return { id, from, to, label, labelX, labelY };
};
const displayChar = (char) => {
    if (char === ' ')
        return '空';
    if (char === '\n')
        return '↵';
    return char;
};
const scale = ref(1);
const translate = ref({ x: 0, y: 0 });
const isDragging = ref(false);
const lastPoint = ref({ x: 0, y: 0 });
const transformValue = computed(() => `translate(${translate.value.x}, ${translate.value.y}) scale(${scale.value})`);
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const onWheel = (event) => {
    const delta = event.deltaY < 0 ? 1.1 : 0.9;
    scale.value = clamp(scale.value * delta, 0.4, 2.5);
};
const onPointerDown = (event) => {
    isDragging.value = true;
    lastPoint.value = { x: event.clientX, y: event.clientY };
};
const onPointerMove = (event) => {
    if (!isDragging.value)
        return;
    translate.value = {
        x: translate.value.x + (event.clientX - lastPoint.value.x),
        y: translate.value.y + (event.clientY - lastPoint.value.y)
    };
    lastPoint.value = { x: event.clientX, y: event.clientY };
};
const endPan = () => {
    isDragging.value = false;
};
const resetView = () => {
    scale.value = 1;
    translate.value = { x: 0, y: 0 };
};
watch(() => props.nodes, () => resetView());
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['tree']} */ ;
/** @type {__VLS_StyleScopedClasses['node']} */ ;
/** @type {__VLS_StyleScopedClasses['freq']} */ ;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.layout.nodes.length) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onWheel: (__VLS_ctx.onWheel) },
        ...{ onPointerdown: (__VLS_ctx.onPointerDown) },
        ...{ onPointermove: (__VLS_ctx.onPointerMove) },
        ...{ onPointerup: (__VLS_ctx.endPan) },
        ...{ onPointerleave: (__VLS_ctx.endPan) },
        ...{ onPointercancel: (__VLS_ctx.endPan) },
        ...{ class: "tree" },
        ...{ class: ({ dragging: __VLS_ctx.isDragging }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.svg, __VLS_intrinsicElements.svg)({
        width: (__VLS_ctx.layout.width),
        height: (__VLS_ctx.layout.height),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.g, __VLS_intrinsicElements.g)({
        transform: (__VLS_ctx.transformValue),
    });
    for (const [edge] of __VLS_getVForSourceType((__VLS_ctx.layout.edges))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.g, __VLS_intrinsicElements.g)({
            key: (edge.id),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.line)({
            x1: (edge.from.x),
            y1: (edge.from.y),
            x2: (edge.to.x),
            y2: (edge.to.y),
            ...{ class: "edge" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.text, __VLS_intrinsicElements.text)({
            x: (edge.labelX),
            y: (edge.labelY),
            ...{ class: "edge-label" },
        });
        (edge.label);
    }
    for (const [node] of __VLS_getVForSourceType((__VLS_ctx.layout.nodes))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.g, __VLS_intrinsicElements.g)({
            key: (node.id),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.circle)({
            cx: (node.x),
            cy: (node.y),
            r: "20",
            ...{ class: "node" },
            ...{ class: ({ leaf: node.charValue }) },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.text, __VLS_intrinsicElements.text)({
            x: (node.x),
            y: (node.y - 8),
            ...{ class: "label" },
        });
        (node.charValue ? __VLS_ctx.displayChar(node.charValue) : '·');
        __VLS_asFunctionalElement(__VLS_intrinsicElements.text, __VLS_intrinsicElements.text)({
            x: (node.x),
            y: (node.y + 12),
            ...{ class: "freq" },
        });
        (node.frequency);
    }
    const __VLS_0 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onClick': {} },
        ...{ class: "reset" },
        size: "small",
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        ...{ class: "reset" },
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_4;
    let __VLS_5;
    let __VLS_6;
    const __VLS_7 = {
        onClick: (__VLS_ctx.resetView)
    };
    __VLS_3.slots.default;
    var __VLS_3;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "hint" },
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "empty" },
    });
}
/** @type {__VLS_StyleScopedClasses['tree']} */ ;
/** @type {__VLS_StyleScopedClasses['edge']} */ ;
/** @type {__VLS_StyleScopedClasses['edge-label']} */ ;
/** @type {__VLS_StyleScopedClasses['node']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['freq']} */ ;
/** @type {__VLS_StyleScopedClasses['reset']} */ ;
/** @type {__VLS_StyleScopedClasses['hint']} */ ;
/** @type {__VLS_StyleScopedClasses['empty']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            layout: layout,
            displayChar: displayChar,
            isDragging: isDragging,
            transformValue: transformValue,
            onWheel: onWheel,
            onPointerDown: onPointerDown,
            onPointerMove: onPointerMove,
            endPan: endPan,
            resetView: resetView,
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
//# sourceMappingURL=HuffmanTreeCanvas.vue.js.map