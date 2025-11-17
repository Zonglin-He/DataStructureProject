import { computed } from 'vue';
import DisjointSetTreeNode from './DisjointSetTreeNode.vue';
const props = defineProps();
const highlightSet = computed(() => new Set(props.highlight ?? []));
const forest = computed(() => {
    const parent = props.parent ?? [];
    if (!parent.length) {
        return [];
    }
    const nodes = parent.map((value, idx) => ({
        vertex: idx,
        parent: value ?? idx,
        rank: props.rank?.[idx] ?? 0,
        children: []
    }));
    nodes.forEach(node => {
        const parentIdx = parent[node.vertex] ?? node.vertex;
        if (parentIdx !== node.vertex && nodes[parentIdx]) {
            nodes[parentIdx].children.push(node);
        }
    });
    nodes.forEach(node => {
        node.children.sort((a, b) => a.vertex - b.vertex);
    });
    return nodes.filter(node => (parent[node.vertex] ?? node.vertex) === node.vertex);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.forest.length) {
    const __VLS_0 = {}.TransitionGroup;
    /** @type {[typeof __VLS_components.TransitionGroup, typeof __VLS_components.transitionGroup, typeof __VLS_components.TransitionGroup, typeof __VLS_components.transitionGroup, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        tag: "div",
        ...{ class: "forest" },
        name: "fade",
    }));
    const __VLS_2 = __VLS_1({
        tag: "div",
        ...{ class: "forest" },
        name: "fade",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_4 = {};
    __VLS_3.slots.default;
    for (const [root] of __VLS_getVForSourceType((__VLS_ctx.forest))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: (root.vertex),
            ...{ class: "set-card" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "set-header" },
        });
        (root.vertex);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({
            ...{ class: "tree-root" },
        });
        /** @type {[typeof DisjointSetTreeNode, ]} */ ;
        // @ts-ignore
        const __VLS_5 = __VLS_asFunctionalComponent(DisjointSetTreeNode, new DisjointSetTreeNode({
            node: (root),
            highlightSet: (__VLS_ctx.highlightSet),
        }));
        const __VLS_6 = __VLS_5({
            node: (root),
            highlightSet: (__VLS_ctx.highlightSet),
        }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    }
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "empty" },
    });
}
/** @type {__VLS_StyleScopedClasses['forest']} */ ;
/** @type {__VLS_StyleScopedClasses['set-card']} */ ;
/** @type {__VLS_StyleScopedClasses['set-header']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-root']} */ ;
/** @type {__VLS_StyleScopedClasses['empty']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            DisjointSetTreeNode: DisjointSetTreeNode,
            highlightSet: highlightSet,
            forest: forest,
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
//# sourceMappingURL=DisjointSetForest.vue.js.map