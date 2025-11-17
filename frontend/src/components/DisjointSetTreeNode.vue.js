import { computed } from 'vue';
defineOptions({ name: 'DisjointSetTreeNode' });
const props = defineProps();
const children = computed(() => [...props.node.children].sort((a, b) => a.vertex - b.vertex));
const isRoot = computed(() => props.node.parent === props.node.vertex);
const isHighlighted = computed(() => props.highlightSet?.has(props.node.vertex) ?? false);
const chipClass = computed(() => ({
    root: isRoot.value,
    highlight: isHighlighted.value
}));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['tree-node']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-node']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-node']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-node']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-node']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-node']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-node']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-node']} */ ;
/** @type {__VLS_StyleScopedClasses['tree-node']} */ ;
/** @type {__VLS_StyleScopedClasses['node-chip']} */ ;
/** @type {__VLS_StyleScopedClasses['node-chip']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)({
    ...{ class: "tree-node" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "node-chip" },
    ...{ class: (__VLS_ctx.chipClass) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "vertex" },
});
(__VLS_ctx.node.vertex);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "meta" },
});
(__VLS_ctx.node.parent);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "meta" },
});
(__VLS_ctx.node.rank);
if (__VLS_ctx.children.length) {
    const __VLS_0 = {}.TransitionGroup;
    /** @type {[typeof __VLS_components.TransitionGroup, typeof __VLS_components.transitionGroup, typeof __VLS_components.TransitionGroup, typeof __VLS_components.transitionGroup, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        name: "fade",
        tag: "ul",
        ...{ class: "children" },
    }));
    const __VLS_2 = __VLS_1({
        name: "fade",
        tag: "ul",
        ...{ class: "children" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    for (const [child] of __VLS_getVForSourceType((__VLS_ctx.children))) {
        const __VLS_4 = {}.DisjointSetTreeNode;
        /** @type {[typeof __VLS_components.DisjointSetTreeNode, ]} */ ;
        // @ts-ignore
        const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
            key: (child.vertex),
            node: (child),
            highlightSet: (__VLS_ctx.highlightSet),
        }));
        const __VLS_6 = __VLS_5({
            key: (child.vertex),
            node: (child),
            highlightSet: (__VLS_ctx.highlightSet),
        }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    }
    var __VLS_3;
}
/** @type {__VLS_StyleScopedClasses['tree-node']} */ ;
/** @type {__VLS_StyleScopedClasses['node-chip']} */ ;
/** @type {__VLS_StyleScopedClasses['vertex']} */ ;
/** @type {__VLS_StyleScopedClasses['meta']} */ ;
/** @type {__VLS_StyleScopedClasses['meta']} */ ;
/** @type {__VLS_StyleScopedClasses['children']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            children: children,
            chipClass: chipClass,
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
//# sourceMappingURL=DisjointSetTreeNode.vue.js.map