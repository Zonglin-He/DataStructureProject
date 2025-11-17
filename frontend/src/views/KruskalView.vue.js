import { computed, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import GraphCanvas from '../components/GraphCanvas.vue';
import StepPlayer from '../components/StepPlayer.vue';
import DisjointSetForest from '../components/DisjointSetForest.vue';
import { runKruskal } from '../api/kruskal';
const demoEdges = [
    { from: 0, to: 1, weight: 7 },
    { from: 0, to: 2, weight: 9 },
    { from: 0, to: 5, weight: 14 },
    { from: 1, to: 2, weight: 10 },
    { from: 1, to: 3, weight: 15 },
    { from: 2, to: 3, weight: 11 },
    { from: 2, to: 5, weight: 2 },
    { from: 3, to: 4, weight: 6 },
    { from: 4, to: 5, weight: 9 }
];
const form = reactive({
    vertexCount: 6
});
const edges = ref(JSON.parse(JSON.stringify(demoEdges)));
const steps = ref([]);
const result = ref(null);
const currentIndex = ref(0);
const loading = ref(false);
const currentStep = computed(() => steps.value[currentIndex.value]);
const parentTable = computed(() => {
    if (!currentStep.value)
        return [];
    return currentStep.value.parentSnapshot.map((parent, idx) => ({
        vertex: idx,
        parent,
        rank: currentStep.value?.rankSnapshot[idx]
    }));
});
const highlightEdges = computed(() => {
    const step = currentStep.value;
    if (!step)
        return [];
    const highlights = [];
    step.currentMstEdges.forEach(edge => {
        highlights.push({ ...edge, state: 'mst' });
    });
    if (step.candidateEdge) {
        highlights.push({ ...step.candidateEdge, state: step.chosen ? 'mst' : 'candidate' });
    }
    return highlights;
});
const previousStep = computed(() => currentIndex.value > 0 ? steps.value[currentIndex.value - 1] : null);
const highlightVertices = computed(() => {
    const set = new Set();
    const step = currentStep.value;
    const prev = previousStep.value;
    if (!step)
        return [];
    if (step.candidateEdge) {
        set.add(step.candidateEdge.from);
        set.add(step.candidateEdge.to);
    }
    if (prev) {
        step.parentSnapshot.forEach((parent, idx) => {
            if (parent !== prev.parentSnapshot[idx]) {
                set.add(idx);
                if (parent !== null && parent !== undefined) {
                    set.add(parent);
                }
                if (prev.parentSnapshot[idx] !== null && prev.parentSnapshot[idx] !== undefined) {
                    set.add(prev.parentSnapshot[idx]);
                }
            }
        });
    }
    return Array.from(set);
});
const loadDemo = () => {
    form.vertexCount = 6;
    edges.value = JSON.parse(JSON.stringify(demoEdges));
};
const addEdge = () => {
    edges.value.push({ from: 0, to: 0, weight: 1 });
};
const removeEdge = (index) => {
    edges.value.splice(index, 1);
};
const run = async () => {
    try {
        loading.value = true;
        const data = await runKruskal({ vertexCount: form.vertexCount, edges: edges.value });
        steps.value = data.steps;
        result.value = data;
        currentIndex.value = 0;
        ElMessage.success('计算完成');
    }
    catch (error) {
        const message = error?.message ?? '';
        if (!error?.response || message.toLowerCase().includes('network')) {
            ElMessage.error(`无法连接后端 ${import.meta.env.VITE_API_BASE ?? 'http://localhost:8080'}，请先启动 Spring Boot 或修改 .env`);
        }
        else {
            ElMessage.error(error.response?.data?.error ?? message ?? '请求失败');
        }
    }
    finally {
        loading.value = false;
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page" },
});
const __VLS_0 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    gutter: (20),
}));
const __VLS_2 = __VLS_1({
    gutter: (20),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    span: (16),
}));
const __VLS_6 = __VLS_5({
    span: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
/** @type {[typeof GraphCanvas, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(GraphCanvas, new GraphCanvas({
    vertexCount: (__VLS_ctx.form.vertexCount),
    edges: (__VLS_ctx.edges),
    highlightEdges: (__VLS_ctx.highlightEdges),
}));
const __VLS_9 = __VLS_8({
    vertexCount: (__VLS_ctx.form.vertexCount),
    edges: (__VLS_ctx.edges),
    highlightEdges: (__VLS_ctx.highlightEdges),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
var __VLS_7;
const __VLS_11 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    span: (8),
}));
const __VLS_13 = __VLS_12({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
__VLS_14.slots.default;
const __VLS_15 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    shadow: "hover",
}));
const __VLS_17 = __VLS_16({
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
__VLS_18.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_18.slots;
}
const __VLS_19 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
    labelWidth: "80px",
    size: "small",
}));
const __VLS_21 = __VLS_20({
    labelWidth: "80px",
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
__VLS_22.slots.default;
const __VLS_23 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
    label: "节点数",
}));
const __VLS_25 = __VLS_24({
    label: "节点数",
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
__VLS_26.slots.default;
const __VLS_27 = {}.ElInputNumber;
/** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
    modelValue: (__VLS_ctx.form.vertexCount),
    min: (2),
}));
const __VLS_29 = __VLS_28({
    modelValue: (__VLS_ctx.form.vertexCount),
    min: (2),
}, ...__VLS_functionalComponentArgsRest(__VLS_28));
var __VLS_26;
var __VLS_22;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "edges" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "edges-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
const __VLS_31 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
    ...{ 'onClick': {} },
    type: "primary",
    link: true,
}));
const __VLS_33 = __VLS_32({
    ...{ 'onClick': {} },
    type: "primary",
    link: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
let __VLS_35;
let __VLS_36;
let __VLS_37;
const __VLS_38 = {
    onClick: (__VLS_ctx.addEdge)
};
__VLS_34.slots.default;
var __VLS_34;
const __VLS_39 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
    data: (__VLS_ctx.edges),
    border: true,
    size: "small",
    height: "220",
}));
const __VLS_41 = __VLS_40({
    data: (__VLS_ctx.edges),
    border: true,
    size: "small",
    height: "220",
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
__VLS_42.slots.default;
const __VLS_43 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
    prop: "from",
    label: "From",
    width: "70",
}));
const __VLS_45 = __VLS_44({
    prop: "from",
    label: "From",
    width: "70",
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
__VLS_46.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_46.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_47 = {}.ElInputNumber;
    /** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({
        modelValue: (scope.row.from),
        min: (0),
        max: (__VLS_ctx.form.vertexCount - 1),
    }));
    const __VLS_49 = __VLS_48({
        modelValue: (scope.row.from),
        min: (0),
        max: (__VLS_ctx.form.vertexCount - 1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_48));
}
var __VLS_46;
const __VLS_51 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
    prop: "to",
    label: "To",
    width: "70",
}));
const __VLS_53 = __VLS_52({
    prop: "to",
    label: "To",
    width: "70",
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
__VLS_54.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_54.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_55 = {}.ElInputNumber;
    /** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
    // @ts-ignore
    const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
        modelValue: (scope.row.to),
        min: (0),
        max: (__VLS_ctx.form.vertexCount - 1),
    }));
    const __VLS_57 = __VLS_56({
        modelValue: (scope.row.to),
        min: (0),
        max: (__VLS_ctx.form.vertexCount - 1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_56));
}
var __VLS_54;
const __VLS_59 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({
    prop: "weight",
    label: "W",
    width: "80",
}));
const __VLS_61 = __VLS_60({
    prop: "weight",
    label: "W",
    width: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
__VLS_62.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_62.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_63 = {}.ElInputNumber;
    /** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
        modelValue: (scope.row.weight),
        min: (0),
    }));
    const __VLS_65 = __VLS_64({
        modelValue: (scope.row.weight),
        min: (0),
    }, ...__VLS_functionalComponentArgsRest(__VLS_64));
}
var __VLS_62;
const __VLS_67 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({
    label: "操作",
    width: "80",
}));
const __VLS_69 = __VLS_68({
    label: "操作",
    width: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_68));
__VLS_70.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_70.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_71 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({
        ...{ 'onClick': {} },
        type: "danger",
        link: true,
    }));
    const __VLS_73 = __VLS_72({
        ...{ 'onClick': {} },
        type: "danger",
        link: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_72));
    let __VLS_75;
    let __VLS_76;
    let __VLS_77;
    const __VLS_78 = {
        onClick: (...[$event]) => {
            __VLS_ctx.removeEdge(scope.$index);
        }
    };
    __VLS_74.slots.default;
    var __VLS_74;
}
var __VLS_70;
var __VLS_42;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "actions" },
});
const __VLS_79 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({
    ...{ 'onClick': {} },
    size: "small",
}));
const __VLS_81 = __VLS_80({
    ...{ 'onClick': {} },
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_80));
let __VLS_83;
let __VLS_84;
let __VLS_85;
const __VLS_86 = {
    onClick: (__VLS_ctx.loadDemo)
};
__VLS_82.slots.default;
var __VLS_82;
const __VLS_87 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87({
    ...{ 'onClick': {} },
    size: "small",
    type: "primary",
    loading: (__VLS_ctx.loading),
}));
const __VLS_89 = __VLS_88({
    ...{ 'onClick': {} },
    size: "small",
    type: "primary",
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_88));
let __VLS_91;
let __VLS_92;
let __VLS_93;
const __VLS_94 = {
    onClick: (__VLS_ctx.run)
};
__VLS_90.slots.default;
var __VLS_90;
var __VLS_18;
var __VLS_14;
var __VLS_3;
const __VLS_95 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_96 = __VLS_asFunctionalComponent(__VLS_95, new __VLS_95({
    gutter: (20),
    ...{ class: "result-row" },
}));
const __VLS_97 = __VLS_96({
    gutter: (20),
    ...{ class: "result-row" },
}, ...__VLS_functionalComponentArgsRest(__VLS_96));
__VLS_98.slots.default;
const __VLS_99 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_100 = __VLS_asFunctionalComponent(__VLS_99, new __VLS_99({
    span: (16),
}));
const __VLS_101 = __VLS_100({
    span: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_100));
__VLS_102.slots.default;
/** @type {[typeof StepPlayer, ]} */ ;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent(StepPlayer, new StepPlayer({
    total: (__VLS_ctx.steps.length),
    modelValue: (__VLS_ctx.currentIndex),
}));
const __VLS_104 = __VLS_103({
    total: (__VLS_ctx.steps.length),
    modelValue: (__VLS_ctx.currentIndex),
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
if (__VLS_ctx.currentStep) {
    const __VLS_106 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    const __VLS_107 = __VLS_asFunctionalComponent(__VLS_106, new __VLS_106({
        ...{ class: "table-card" },
    }));
    const __VLS_108 = __VLS_107({
        ...{ class: "table-card" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_107));
    __VLS_109.slots.default;
    {
        const { header: __VLS_thisSlot } = __VLS_109.slots;
    }
    const __VLS_110 = {}.ElDescriptions;
    /** @type {[typeof __VLS_components.ElDescriptions, typeof __VLS_components.elDescriptions, typeof __VLS_components.ElDescriptions, typeof __VLS_components.elDescriptions, ]} */ ;
    // @ts-ignore
    const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({
        column: (1),
        size: "small",
    }));
    const __VLS_112 = __VLS_111({
        column: (1),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_111));
    __VLS_113.slots.default;
    const __VLS_114 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    const __VLS_115 = __VLS_asFunctionalComponent(__VLS_114, new __VLS_114({
        label: "候选边",
    }));
    const __VLS_116 = __VLS_115({
        label: "候选边",
    }, ...__VLS_functionalComponentArgsRest(__VLS_115));
    __VLS_117.slots.default;
    (__VLS_ctx.currentStep?.candidateEdge.from);
    (__VLS_ctx.currentStep?.candidateEdge.to);
    (__VLS_ctx.currentStep?.candidateEdge.weight);
    var __VLS_117;
    const __VLS_118 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    const __VLS_119 = __VLS_asFunctionalComponent(__VLS_118, new __VLS_118({
        label: "是否加入",
    }));
    const __VLS_120 = __VLS_119({
        label: "是否加入",
    }, ...__VLS_functionalComponentArgsRest(__VLS_119));
    __VLS_121.slots.default;
    (__VLS_ctx.currentStep?.chosen ? '是' : '否');
    var __VLS_121;
    const __VLS_122 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({
        label: "连通块数量",
    }));
    const __VLS_124 = __VLS_123({
        label: "连通块数量",
    }, ...__VLS_functionalComponentArgsRest(__VLS_123));
    __VLS_125.slots.default;
    (__VLS_ctx.currentStep?.components);
    var __VLS_125;
    var __VLS_113;
    const __VLS_126 = {}.ElDivider;
    /** @type {[typeof __VLS_components.ElDivider, typeof __VLS_components.elDivider, ]} */ ;
    // @ts-ignore
    const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({}));
    const __VLS_128 = __VLS_127({}, ...__VLS_functionalComponentArgsRest(__VLS_127));
    const __VLS_130 = {}.ElTable;
    /** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
    // @ts-ignore
    const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({
        data: (__VLS_ctx.parentTable),
        size: "small",
        border: true,
    }));
    const __VLS_132 = __VLS_131({
        data: (__VLS_ctx.parentTable),
        size: "small",
        border: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_131));
    __VLS_133.slots.default;
    const __VLS_134 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_135 = __VLS_asFunctionalComponent(__VLS_134, new __VLS_134({
        prop: "vertex",
        label: "顶点",
        width: "70",
    }));
    const __VLS_136 = __VLS_135({
        prop: "vertex",
        label: "顶点",
        width: "70",
    }, ...__VLS_functionalComponentArgsRest(__VLS_135));
    const __VLS_138 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_139 = __VLS_asFunctionalComponent(__VLS_138, new __VLS_138({
        prop: "parent",
        label: "parent",
    }));
    const __VLS_140 = __VLS_139({
        prop: "parent",
        label: "parent",
    }, ...__VLS_functionalComponentArgsRest(__VLS_139));
    const __VLS_142 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_143 = __VLS_asFunctionalComponent(__VLS_142, new __VLS_142({
        prop: "rank",
        label: "rank",
    }));
    const __VLS_144 = __VLS_143({
        prop: "rank",
        label: "rank",
    }, ...__VLS_functionalComponentArgsRest(__VLS_143));
    var __VLS_133;
    const __VLS_146 = {}.ElDivider;
    /** @type {[typeof __VLS_components.ElDivider, typeof __VLS_components.elDivider, ]} */ ;
    // @ts-ignore
    const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({}));
    const __VLS_148 = __VLS_147({}, ...__VLS_functionalComponentArgsRest(__VLS_147));
    /** @type {[typeof DisjointSetForest, ]} */ ;
    // @ts-ignore
    const __VLS_150 = __VLS_asFunctionalComponent(DisjointSetForest, new DisjointSetForest({
        parent: (__VLS_ctx.currentStep?.parentSnapshot),
        rank: (__VLS_ctx.currentStep?.rankSnapshot),
        highlight: (__VLS_ctx.highlightVertices),
    }));
    const __VLS_151 = __VLS_150({
        parent: (__VLS_ctx.currentStep?.parentSnapshot),
        rank: (__VLS_ctx.currentStep?.rankSnapshot),
        highlight: (__VLS_ctx.highlightVertices),
    }, ...__VLS_functionalComponentArgsRest(__VLS_150));
    var __VLS_109;
}
var __VLS_102;
const __VLS_153 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_154 = __VLS_asFunctionalComponent(__VLS_153, new __VLS_153({
    span: (8),
}));
const __VLS_155 = __VLS_154({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_154));
__VLS_156.slots.default;
if (__VLS_ctx.result) {
    const __VLS_157 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    const __VLS_158 = __VLS_asFunctionalComponent(__VLS_157, new __VLS_157({
        ...{ class: "table-card" },
    }));
    const __VLS_159 = __VLS_158({
        ...{ class: "table-card" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_158));
    __VLS_160.slots.default;
    {
        const { header: __VLS_thisSlot } = __VLS_160.slots;
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (__VLS_ctx.result?.totalWeight);
    (__VLS_ctx.result?.mstEdges.length);
    const __VLS_161 = {}.ElTable;
    /** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
    // @ts-ignore
    const __VLS_162 = __VLS_asFunctionalComponent(__VLS_161, new __VLS_161({
        data: (__VLS_ctx.result?.mstEdges),
        size: "small",
        border: true,
    }));
    const __VLS_163 = __VLS_162({
        data: (__VLS_ctx.result?.mstEdges),
        size: "small",
        border: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_162));
    __VLS_164.slots.default;
    const __VLS_165 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_166 = __VLS_asFunctionalComponent(__VLS_165, new __VLS_165({
        prop: "from",
        label: "From",
        width: "70",
    }));
    const __VLS_167 = __VLS_166({
        prop: "from",
        label: "From",
        width: "70",
    }, ...__VLS_functionalComponentArgsRest(__VLS_166));
    const __VLS_169 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_170 = __VLS_asFunctionalComponent(__VLS_169, new __VLS_169({
        prop: "to",
        label: "To",
        width: "70",
    }));
    const __VLS_171 = __VLS_170({
        prop: "to",
        label: "To",
        width: "70",
    }, ...__VLS_functionalComponentArgsRest(__VLS_170));
    const __VLS_173 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_174 = __VLS_asFunctionalComponent(__VLS_173, new __VLS_173({
        prop: "weight",
        label: "W",
    }));
    const __VLS_175 = __VLS_174({
        prop: "weight",
        label: "W",
    }, ...__VLS_functionalComponentArgsRest(__VLS_174));
    var __VLS_164;
    var __VLS_160;
}
var __VLS_156;
var __VLS_98;
/** @type {__VLS_StyleScopedClasses['page']} */ ;
/** @type {__VLS_StyleScopedClasses['edges']} */ ;
/** @type {__VLS_StyleScopedClasses['edges-header']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
/** @type {__VLS_StyleScopedClasses['result-row']} */ ;
/** @type {__VLS_StyleScopedClasses['table-card']} */ ;
/** @type {__VLS_StyleScopedClasses['table-card']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            GraphCanvas: GraphCanvas,
            StepPlayer: StepPlayer,
            DisjointSetForest: DisjointSetForest,
            form: form,
            edges: edges,
            steps: steps,
            result: result,
            currentIndex: currentIndex,
            loading: loading,
            currentStep: currentStep,
            parentTable: parentTable,
            highlightEdges: highlightEdges,
            highlightVertices: highlightVertices,
            loadDemo: loadDemo,
            addEdge: addEdge,
            removeEdge: removeEdge,
            run: run,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=KruskalView.vue.js.map