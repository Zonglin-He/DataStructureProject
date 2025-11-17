import { computed, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import GraphCanvas from '../components/GraphCanvas.vue';
import StepPlayer from '../components/StepPlayer.vue';
import { runDijkstra } from '../api/dijkstra';
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
    vertexCount: 6,
    directed: false,
    source: 0
});
const edges = ref(JSON.parse(JSON.stringify(demoEdges)));
const steps = ref([]);
const result = ref(null);
const currentIndex = ref(0);
const loading = ref(false);
const payload = computed(() => ({
    vertexCount: form.vertexCount,
    directed: form.directed,
    source: form.source,
    edges: edges.value
}));
const currentStep = computed(() => steps.value[currentIndex.value]);
const distanceTable = computed(() => {
    if (!currentStep.value)
        return [];
    return Object.entries(currentStep.value.distance).map(([vertex, dist]) => ({
        vertex,
        distance: dist ?? 'INF',
        parent: currentStep.value?.parent[Number(vertex)] ?? '-'
    }));
});
const reachableCount = computed(() => {
    if (!result.value || steps.value.length === 0)
        return 0;
    const last = steps.value[steps.value.length - 1];
    return Object.values(last.distance ?? {}).filter(v => v !== null).length;
});
const loadDemo = () => {
    form.vertexCount = 6;
    form.source = 0;
    form.directed = false;
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
        const data = await runDijkstra(payload.value);
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
    step: (__VLS_ctx.currentStep),
}));
const __VLS_9 = __VLS_8({
    vertexCount: (__VLS_ctx.form.vertexCount),
    edges: (__VLS_ctx.edges),
    step: (__VLS_ctx.currentStep),
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
const __VLS_31 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
    label: "起点",
}));
const __VLS_33 = __VLS_32({
    label: "起点",
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
__VLS_34.slots.default;
const __VLS_35 = {}.ElInputNumber;
/** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
    modelValue: (__VLS_ctx.form.source),
    min: (0),
    max: (__VLS_ctx.form.vertexCount - 1),
}));
const __VLS_37 = __VLS_36({
    modelValue: (__VLS_ctx.form.source),
    min: (0),
    max: (__VLS_ctx.form.vertexCount - 1),
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
var __VLS_34;
const __VLS_39 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
    label: "是否有向",
}));
const __VLS_41 = __VLS_40({
    label: "是否有向",
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
__VLS_42.slots.default;
const __VLS_43 = {}.ElSwitch;
/** @type {[typeof __VLS_components.ElSwitch, typeof __VLS_components.elSwitch, ]} */ ;
// @ts-ignore
const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
    modelValue: (__VLS_ctx.form.directed),
}));
const __VLS_45 = __VLS_44({
    modelValue: (__VLS_ctx.form.directed),
}, ...__VLS_functionalComponentArgsRest(__VLS_44));
var __VLS_42;
var __VLS_22;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "edges" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "edges-header" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
const __VLS_47 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({
    ...{ 'onClick': {} },
    type: "primary",
    link: true,
}));
const __VLS_49 = __VLS_48({
    ...{ 'onClick': {} },
    type: "primary",
    link: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
let __VLS_51;
let __VLS_52;
let __VLS_53;
const __VLS_54 = {
    onClick: (__VLS_ctx.addEdge)
};
__VLS_50.slots.default;
var __VLS_50;
const __VLS_55 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
    data: (__VLS_ctx.edges),
    border: true,
    size: "small",
    height: "220",
}));
const __VLS_57 = __VLS_56({
    data: (__VLS_ctx.edges),
    border: true,
    size: "small",
    height: "220",
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
__VLS_58.slots.default;
const __VLS_59 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({
    prop: "from",
    label: "From",
    width: "70",
}));
const __VLS_61 = __VLS_60({
    prop: "from",
    label: "From",
    width: "70",
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
__VLS_62.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_62.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_63 = {}.ElInputNumber;
    /** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
        modelValue: (scope.row.from),
        min: (0),
        max: (__VLS_ctx.form.vertexCount - 1),
    }));
    const __VLS_65 = __VLS_64({
        modelValue: (scope.row.from),
        min: (0),
        max: (__VLS_ctx.form.vertexCount - 1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_64));
}
var __VLS_62;
const __VLS_67 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({
    prop: "to",
    label: "To",
    width: "70",
}));
const __VLS_69 = __VLS_68({
    prop: "to",
    label: "To",
    width: "70",
}, ...__VLS_functionalComponentArgsRest(__VLS_68));
__VLS_70.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_70.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_71 = {}.ElInputNumber;
    /** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
    // @ts-ignore
    const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71({
        modelValue: (scope.row.to),
        min: (0),
        max: (__VLS_ctx.form.vertexCount - 1),
    }));
    const __VLS_73 = __VLS_72({
        modelValue: (scope.row.to),
        min: (0),
        max: (__VLS_ctx.form.vertexCount - 1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_72));
}
var __VLS_70;
const __VLS_75 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({
    prop: "weight",
    label: "W",
    width: "80",
}));
const __VLS_77 = __VLS_76({
    prop: "weight",
    label: "W",
    width: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_76));
__VLS_78.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_78.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_79 = {}.ElInputNumber;
    /** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
    // @ts-ignore
    const __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({
        modelValue: (scope.row.weight),
        min: (0),
    }));
    const __VLS_81 = __VLS_80({
        modelValue: (scope.row.weight),
        min: (0),
    }, ...__VLS_functionalComponentArgsRest(__VLS_80));
}
var __VLS_78;
const __VLS_83 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83({
    label: "操作",
    width: "80",
}));
const __VLS_85 = __VLS_84({
    label: "操作",
    width: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_84));
__VLS_86.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_86.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_87 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87({
        ...{ 'onClick': {} },
        type: "danger",
        link: true,
    }));
    const __VLS_89 = __VLS_88({
        ...{ 'onClick': {} },
        type: "danger",
        link: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_88));
    let __VLS_91;
    let __VLS_92;
    let __VLS_93;
    const __VLS_94 = {
        onClick: (...[$event]) => {
            __VLS_ctx.removeEdge(scope.$index);
        }
    };
    __VLS_90.slots.default;
    var __VLS_90;
}
var __VLS_86;
var __VLS_58;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "actions" },
});
const __VLS_95 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_96 = __VLS_asFunctionalComponent(__VLS_95, new __VLS_95({
    ...{ 'onClick': {} },
    size: "small",
}));
const __VLS_97 = __VLS_96({
    ...{ 'onClick': {} },
    size: "small",
}, ...__VLS_functionalComponentArgsRest(__VLS_96));
let __VLS_99;
let __VLS_100;
let __VLS_101;
const __VLS_102 = {
    onClick: (__VLS_ctx.loadDemo)
};
__VLS_98.slots.default;
var __VLS_98;
const __VLS_103 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_104 = __VLS_asFunctionalComponent(__VLS_103, new __VLS_103({
    ...{ 'onClick': {} },
    size: "small",
    type: "primary",
    loading: (__VLS_ctx.loading),
}));
const __VLS_105 = __VLS_104({
    ...{ 'onClick': {} },
    size: "small",
    type: "primary",
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_104));
let __VLS_107;
let __VLS_108;
let __VLS_109;
const __VLS_110 = {
    onClick: (__VLS_ctx.run)
};
__VLS_106.slots.default;
var __VLS_106;
var __VLS_18;
var __VLS_14;
var __VLS_3;
const __VLS_111 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_112 = __VLS_asFunctionalComponent(__VLS_111, new __VLS_111({
    gutter: (20),
    ...{ class: "result-row" },
}));
const __VLS_113 = __VLS_112({
    gutter: (20),
    ...{ class: "result-row" },
}, ...__VLS_functionalComponentArgsRest(__VLS_112));
__VLS_114.slots.default;
const __VLS_115 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_116 = __VLS_asFunctionalComponent(__VLS_115, new __VLS_115({
    span: (16),
}));
const __VLS_117 = __VLS_116({
    span: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_116));
__VLS_118.slots.default;
/** @type {[typeof StepPlayer, ]} */ ;
// @ts-ignore
const __VLS_119 = __VLS_asFunctionalComponent(StepPlayer, new StepPlayer({
    total: (__VLS_ctx.steps.length),
    modelValue: (__VLS_ctx.currentIndex),
}));
const __VLS_120 = __VLS_119({
    total: (__VLS_ctx.steps.length),
    modelValue: (__VLS_ctx.currentIndex),
}, ...__VLS_functionalComponentArgsRest(__VLS_119));
if (__VLS_ctx.currentStep) {
    const __VLS_122 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({
        ...{ class: "table-card" },
    }));
    const __VLS_124 = __VLS_123({
        ...{ class: "table-card" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_123));
    __VLS_125.slots.default;
    {
        const { header: __VLS_thisSlot } = __VLS_125.slots;
    }
    const __VLS_126 = {}.ElTable;
    /** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
    // @ts-ignore
    const __VLS_127 = __VLS_asFunctionalComponent(__VLS_126, new __VLS_126({
        data: (__VLS_ctx.distanceTable),
        size: "small",
        border: true,
    }));
    const __VLS_128 = __VLS_127({
        data: (__VLS_ctx.distanceTable),
        size: "small",
        border: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_127));
    __VLS_129.slots.default;
    const __VLS_130 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({
        prop: "vertex",
        label: "顶点",
        width: "70",
    }));
    const __VLS_132 = __VLS_131({
        prop: "vertex",
        label: "顶点",
        width: "70",
    }, ...__VLS_functionalComponentArgsRest(__VLS_131));
    const __VLS_134 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_135 = __VLS_asFunctionalComponent(__VLS_134, new __VLS_134({
        prop: "distance",
        label: "dist",
    }));
    const __VLS_136 = __VLS_135({
        prop: "distance",
        label: "dist",
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
    var __VLS_129;
    var __VLS_125;
}
var __VLS_118;
const __VLS_142 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_143 = __VLS_asFunctionalComponent(__VLS_142, new __VLS_142({
    span: (8),
}));
const __VLS_144 = __VLS_143({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_143));
__VLS_145.slots.default;
if (__VLS_ctx.result) {
    const __VLS_146 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({
        ...{ class: "table-card" },
    }));
    const __VLS_148 = __VLS_147({
        ...{ class: "table-card" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_147));
    __VLS_149.slots.default;
    {
        const { header: __VLS_thisSlot } = __VLS_149.slots;
    }
    const __VLS_150 = {}.ElDescriptions;
    /** @type {[typeof __VLS_components.ElDescriptions, typeof __VLS_components.elDescriptions, typeof __VLS_components.ElDescriptions, typeof __VLS_components.elDescriptions, ]} */ ;
    // @ts-ignore
    const __VLS_151 = __VLS_asFunctionalComponent(__VLS_150, new __VLS_150({
        column: (1),
        size: "small",
    }));
    const __VLS_152 = __VLS_151({
        column: (1),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_151));
    __VLS_153.slots.default;
    const __VLS_154 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    const __VLS_155 = __VLS_asFunctionalComponent(__VLS_154, new __VLS_154({
        label: "可达节点",
    }));
    const __VLS_156 = __VLS_155({
        label: "可达节点",
    }, ...__VLS_functionalComponentArgsRest(__VLS_155));
    __VLS_157.slots.default;
    (__VLS_ctx.reachableCount);
    var __VLS_157;
    const __VLS_158 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    const __VLS_159 = __VLS_asFunctionalComponent(__VLS_158, new __VLS_158({
        label: "Step 数",
    }));
    const __VLS_160 = __VLS_159({
        label: "Step 数",
    }, ...__VLS_functionalComponentArgsRest(__VLS_159));
    __VLS_161.slots.default;
    (__VLS_ctx.steps.length);
    var __VLS_161;
    var __VLS_153;
    var __VLS_149;
}
var __VLS_145;
var __VLS_114;
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
            form: form,
            edges: edges,
            steps: steps,
            result: result,
            currentIndex: currentIndex,
            loading: loading,
            currentStep: currentStep,
            distanceTable: distanceTable,
            reachableCount: reachableCount,
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
//# sourceMappingURL=DijkstraView.vue.js.map