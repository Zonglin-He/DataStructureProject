import { computed, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { encodeHuffman } from '../api/huffman';
import HuffmanTreeCanvas from '../components/HuffmanTreeCanvas.vue';
const text = ref('ALGORITHMS ARE FUN!');
const result = ref(null);
const loading = ref(false);
const codesTable = computed(() => {
    if (!result.value)
        return [];
    return Object.entries(result.value.codes).map(([char, code]) => ({
        char,
        code,
        frequency: result.value?.nodes.find(node => node.charValue === char)?.frequency ?? 0
    }));
});
const previewBits = computed(() => {
    if (!result.value)
        return '';
    return result.value.encodedBits.slice(0, 256);
});
const compressionRate = computed(() => {
    if (!result.value || result.value.originalBits === 0)
        return '-';
    const rate = (result.value.compressedBits / result.value.originalBits) * 100;
    return rate.toFixed(2) + '%';
});
const displayChar = (char) => {
    if (char === ' ')
        return '[空格]';
    if (char === '\n')
        return '[换行]';
    return char;
};
const requireResult = () => {
    if (!result.value) {
        ElMessage.warning('请先生成编码');
        return false;
    }
    return true;
};
const copyCodes = async () => {
    if (!requireResult())
        return;
    try {
        await navigator.clipboard.writeText(JSON.stringify(result.value.codes, null, 2));
        ElMessage.success('编码表已复制');
    }
    catch {
        ElMessage.error('复制失败，请检查浏览器权限');
    }
};
const copyEncodedBits = async () => {
    if (!requireResult())
        return;
    try {
        await navigator.clipboard.writeText(result.value.encodedBits);
        ElMessage.success('编码结果已复制');
    }
    catch {
        ElMessage.error('复制失败，请检查浏览器权限');
    }
};
const downloadEncoding = () => {
    if (!requireResult())
        return;
    const payload = {
        input: text.value,
        codes: result.value.codes,
        encodedBits: result.value.encodedBits,
        stats: {
            originalBits: result.value.originalBits,
            compressedBits: result.value.compressedBits
        }
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `huffman-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    ElMessage.success('已导出 Huffman 数据');
};
const run = async () => {
    if (!text.value.trim()) {
        ElMessage.warning('请输入文本');
        return;
    }
    try {
        loading.value = true;
        result.value = await encodeHuffman({ text: text.value });
        ElMessage.success('编码完成');
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
    span: (8),
}));
const __VLS_6 = __VLS_5({
    span: (8),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
const __VLS_8 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    shadow: "hover",
}));
const __VLS_10 = __VLS_9({
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_11.slots;
}
const __VLS_12 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    modelValue: (__VLS_ctx.text),
    type: "textarea",
    rows: (8),
    placeholder: "请输入要编码的文本",
}));
const __VLS_14 = __VLS_13({
    modelValue: (__VLS_ctx.text),
    type: "textarea",
    rows: (8),
    placeholder: "请输入要编码的文本",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "actions" },
});
const __VLS_16 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ...{ 'onClick': {} },
    type: "primary",
    size: "small",
    loading: (__VLS_ctx.loading),
}));
const __VLS_18 = __VLS_17({
    ...{ 'onClick': {} },
    type: "primary",
    size: "small",
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
let __VLS_20;
let __VLS_21;
let __VLS_22;
const __VLS_23 = {
    onClick: (__VLS_ctx.run)
};
__VLS_19.slots.default;
var __VLS_19;
const __VLS_24 = {}.ElAlert;
/** @type {[typeof __VLS_components.ElAlert, typeof __VLS_components.elAlert, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    title: "Huffman 以 8bit 原文 vs. 实际编码位数对比压缩率",
    type: "info",
    closable: (false),
    showIcon: true,
}));
const __VLS_26 = __VLS_25({
    title: "Huffman 以 8bit 原文 vs. 实际编码位数对比压缩率",
    type: "info",
    closable: (false),
    showIcon: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
var __VLS_11;
if (__VLS_ctx.result) {
    const __VLS_28 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        ...{ class: "stats-card" },
        shadow: "hover",
    }));
    const __VLS_30 = __VLS_29({
        ...{ class: "stats-card" },
        shadow: "hover",
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    __VLS_31.slots.default;
    {
        const { header: __VLS_thisSlot } = __VLS_31.slots;
    }
    const __VLS_32 = {}.ElDescriptions;
    /** @type {[typeof __VLS_components.ElDescriptions, typeof __VLS_components.elDescriptions, typeof __VLS_components.ElDescriptions, typeof __VLS_components.elDescriptions, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        column: (1),
        size: "small",
    }));
    const __VLS_34 = __VLS_33({
        column: (1),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    __VLS_35.slots.default;
    const __VLS_36 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        label: "原始位数",
    }));
    const __VLS_38 = __VLS_37({
        label: "原始位数",
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    __VLS_39.slots.default;
    (__VLS_ctx.result?.originalBits);
    var __VLS_39;
    const __VLS_40 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        label: "压缩后位数",
    }));
    const __VLS_42 = __VLS_41({
        label: "压缩后位数",
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    __VLS_43.slots.default;
    (__VLS_ctx.result?.compressedBits);
    var __VLS_43;
    const __VLS_44 = {}.ElDescriptionsItem;
    /** @type {[typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, typeof __VLS_components.ElDescriptionsItem, typeof __VLS_components.elDescriptionsItem, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
        label: "压缩率",
    }));
    const __VLS_46 = __VLS_45({
        label: "压缩率",
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    __VLS_47.slots.default;
    (__VLS_ctx.compressionRate);
    var __VLS_47;
    var __VLS_35;
    var __VLS_31;
}
var __VLS_7;
const __VLS_48 = {}.ElCol;
/** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    span: (16),
}));
const __VLS_50 = __VLS_49({
    span: (16),
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_51.slots.default;
const __VLS_52 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
    shadow: "hover",
}));
const __VLS_54 = __VLS_53({
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
__VLS_55.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_55.slots;
}
/** @type {[typeof HuffmanTreeCanvas, ]} */ ;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent(HuffmanTreeCanvas, new HuffmanTreeCanvas({
    nodes: (__VLS_ctx.result?.nodes ?? null),
}));
const __VLS_57 = __VLS_56({
    nodes: (__VLS_ctx.result?.nodes ?? null),
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
var __VLS_55;
const __VLS_59 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({
    ...{ class: "stats-card" },
    shadow: "hover",
}));
const __VLS_61 = __VLS_60({
    ...{ class: "stats-card" },
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
__VLS_62.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_62.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "card-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    const __VLS_63 = {}.ElSpace;
    /** @type {[typeof __VLS_components.ElSpace, typeof __VLS_components.elSpace, typeof __VLS_components.ElSpace, typeof __VLS_components.elSpace, ]} */ ;
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({}));
    const __VLS_65 = __VLS_64({}, ...__VLS_functionalComponentArgsRest(__VLS_64));
    __VLS_66.slots.default;
    const __VLS_67 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({
        ...{ 'onClick': {} },
        size: "small",
        disabled: (!__VLS_ctx.result),
    }));
    const __VLS_69 = __VLS_68({
        ...{ 'onClick': {} },
        size: "small",
        disabled: (!__VLS_ctx.result),
    }, ...__VLS_functionalComponentArgsRest(__VLS_68));
    let __VLS_71;
    let __VLS_72;
    let __VLS_73;
    const __VLS_74 = {
        onClick: (__VLS_ctx.copyCodes)
    };
    __VLS_70.slots.default;
    var __VLS_70;
    const __VLS_75 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({
        ...{ 'onClick': {} },
        size: "small",
        disabled: (!__VLS_ctx.result),
    }));
    const __VLS_77 = __VLS_76({
        ...{ 'onClick': {} },
        size: "small",
        disabled: (!__VLS_ctx.result),
    }, ...__VLS_functionalComponentArgsRest(__VLS_76));
    let __VLS_79;
    let __VLS_80;
    let __VLS_81;
    const __VLS_82 = {
        onClick: (__VLS_ctx.downloadEncoding)
    };
    __VLS_78.slots.default;
    var __VLS_78;
    var __VLS_66;
}
if (__VLS_ctx.codesTable.length) {
    const __VLS_83 = {}.ElTable;
    /** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
    // @ts-ignore
    const __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83({
        data: (__VLS_ctx.codesTable),
        border: true,
        size: "small",
    }));
    const __VLS_85 = __VLS_84({
        data: (__VLS_ctx.codesTable),
        border: true,
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_84));
    __VLS_86.slots.default;
    const __VLS_87 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87({
        prop: "char",
        label: "字符",
        width: "100",
    }));
    const __VLS_89 = __VLS_88({
        prop: "char",
        label: "字符",
        width: "100",
    }, ...__VLS_functionalComponentArgsRest(__VLS_88));
    const __VLS_91 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_92 = __VLS_asFunctionalComponent(__VLS_91, new __VLS_91({
        prop: "frequency",
        label: "频次",
        width: "100",
    }));
    const __VLS_93 = __VLS_92({
        prop: "frequency",
        label: "频次",
        width: "100",
    }, ...__VLS_functionalComponentArgsRest(__VLS_92));
    const __VLS_95 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_96 = __VLS_asFunctionalComponent(__VLS_95, new __VLS_95({
        prop: "code",
        label: "编码",
    }));
    const __VLS_97 = __VLS_96({
        prop: "code",
        label: "编码",
    }, ...__VLS_functionalComponentArgsRest(__VLS_96));
    var __VLS_86;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "empty" },
    });
}
var __VLS_62;
if (__VLS_ctx.result) {
    const __VLS_99 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    const __VLS_100 = __VLS_asFunctionalComponent(__VLS_99, new __VLS_99({
        ...{ class: "stats-card" },
        shadow: "hover",
    }));
    const __VLS_101 = __VLS_100({
        ...{ class: "stats-card" },
        shadow: "hover",
    }, ...__VLS_functionalComponentArgsRest(__VLS_100));
    __VLS_102.slots.default;
    {
        const { header: __VLS_thisSlot } = __VLS_102.slots;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: "card-header" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        const __VLS_103 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_104 = __VLS_asFunctionalComponent(__VLS_103, new __VLS_103({
            ...{ 'onClick': {} },
            size: "small",
        }));
        const __VLS_105 = __VLS_104({
            ...{ 'onClick': {} },
            size: "small",
        }, ...__VLS_functionalComponentArgsRest(__VLS_104));
        let __VLS_107;
        let __VLS_108;
        let __VLS_109;
        const __VLS_110 = {
            onClick: (__VLS_ctx.copyEncodedBits)
        };
        __VLS_106.slots.default;
        var __VLS_106;
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "encoded" },
    });
    (__VLS_ctx.previewBits);
    var __VLS_102;
}
var __VLS_51;
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
    span: (24),
}));
const __VLS_117 = __VLS_116({
    span: (24),
}, ...__VLS_functionalComponentArgsRest(__VLS_116));
__VLS_118.slots.default;
const __VLS_119 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_120 = __VLS_asFunctionalComponent(__VLS_119, new __VLS_119({
    shadow: "hover",
}));
const __VLS_121 = __VLS_120({
    shadow: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_120));
__VLS_122.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_122.slots;
}
if (__VLS_ctx.result) {
    const __VLS_123 = {}.ElTable;
    /** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
    // @ts-ignore
    const __VLS_124 = __VLS_asFunctionalComponent(__VLS_123, new __VLS_123({
        data: (__VLS_ctx.result.nodes),
        border: true,
        size: "small",
    }));
    const __VLS_125 = __VLS_124({
        data: (__VLS_ctx.result.nodes),
        border: true,
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_124));
    __VLS_126.slots.default;
    const __VLS_127 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_128 = __VLS_asFunctionalComponent(__VLS_127, new __VLS_127({
        prop: "id",
        label: "节点",
        width: "160",
    }));
    const __VLS_129 = __VLS_128({
        prop: "id",
        label: "节点",
        width: "160",
    }, ...__VLS_functionalComponentArgsRest(__VLS_128));
    const __VLS_131 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_132 = __VLS_asFunctionalComponent(__VLS_131, new __VLS_131({
        prop: "charValue",
        label: "字符",
        width: "120",
    }));
    const __VLS_133 = __VLS_132({
        prop: "charValue",
        label: "字符",
        width: "120",
    }, ...__VLS_functionalComponentArgsRest(__VLS_132));
    __VLS_134.slots.default;
    {
        const { default: __VLS_thisSlot } = __VLS_134.slots;
        const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
        if (scope.row.charValue) {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
            (__VLS_ctx.displayChar(scope.row.charValue));
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        }
    }
    var __VLS_134;
    const __VLS_135 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_136 = __VLS_asFunctionalComponent(__VLS_135, new __VLS_135({
        prop: "frequency",
        label: "频率",
        width: "120",
    }));
    const __VLS_137 = __VLS_136({
        prop: "frequency",
        label: "频率",
        width: "120",
    }, ...__VLS_functionalComponentArgsRest(__VLS_136));
    const __VLS_139 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_140 = __VLS_asFunctionalComponent(__VLS_139, new __VLS_139({
        prop: "leftId",
        label: "左子",
        width: "160",
    }));
    const __VLS_141 = __VLS_140({
        prop: "leftId",
        label: "左子",
        width: "160",
    }, ...__VLS_functionalComponentArgsRest(__VLS_140));
    const __VLS_143 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_144 = __VLS_asFunctionalComponent(__VLS_143, new __VLS_143({
        prop: "rightId",
        label: "右子",
        width: "160",
    }));
    const __VLS_145 = __VLS_144({
        prop: "rightId",
        label: "右子",
        width: "160",
    }, ...__VLS_functionalComponentArgsRest(__VLS_144));
    const __VLS_147 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_148 = __VLS_asFunctionalComponent(__VLS_147, new __VLS_147({
        prop: "code",
        label: "编码",
    }));
    const __VLS_149 = __VLS_148({
        prop: "code",
        label: "编码",
    }, ...__VLS_functionalComponentArgsRest(__VLS_148));
    var __VLS_126;
}
var __VLS_122;
var __VLS_118;
var __VLS_114;
/** @type {__VLS_StyleScopedClasses['page']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-card']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['empty']} */ ;
/** @type {__VLS_StyleScopedClasses['stats-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-header']} */ ;
/** @type {__VLS_StyleScopedClasses['encoded']} */ ;
/** @type {__VLS_StyleScopedClasses['result-row']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            HuffmanTreeCanvas: HuffmanTreeCanvas,
            text: text,
            result: result,
            loading: loading,
            codesTable: codesTable,
            previewBits: previewBits,
            compressionRate: compressionRate,
            displayChar: displayChar,
            copyCodes: copyCodes,
            copyEncodedBits: copyEncodedBits,
            downloadEncoding: downloadEncoding,
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
//# sourceMappingURL=HuffmanView.vue.js.map