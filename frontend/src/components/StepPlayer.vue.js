import { onBeforeUnmount, watch, ref } from 'vue';
const props = defineProps();
const emit = defineEmits();
const playing = ref(false);
let timer = null;
const stop = () => {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
};
const togglePlay = () => {
    playing.value = !playing.value;
    if (playing.value) {
        timer = setInterval(() => {
            if (props.modelValue >= props.total - 1) {
                stop();
                playing.value = false;
                return;
            }
            emit('update:modelValue', props.modelValue + 1);
        }, 800);
    }
    else {
        stop();
    }
};
const step = (offset) => {
    const next = Math.min(props.total - 1, Math.max(0, props.modelValue + offset));
    emit('update:modelValue', next);
};
watch(() => props.modelValue, () => {
    if (props.modelValue >= props.total - 1) {
        stop();
        playing.value = false;
    }
});
onBeforeUnmount(stop);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['controls']} */ ;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.total > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "player" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "controls" },
    });
    const __VLS_0 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onClick': {} },
        size: "small",
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onClick': {} },
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_4;
    let __VLS_5;
    let __VLS_6;
    const __VLS_7 = {
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.total > 0))
                return;
            __VLS_ctx.emit('update:modelValue', 0);
        }
    };
    __VLS_3.slots.default;
    var __VLS_3;
    const __VLS_8 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        ...{ 'onClick': {} },
        size: "small",
        disabled: (__VLS_ctx.modelValue <= 0),
    }));
    const __VLS_10 = __VLS_9({
        ...{ 'onClick': {} },
        size: "small",
        disabled: (__VLS_ctx.modelValue <= 0),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_12;
    let __VLS_13;
    let __VLS_14;
    const __VLS_15 = {
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.total > 0))
                return;
            __VLS_ctx.step(-1);
        }
    };
    __VLS_11.slots.default;
    var __VLS_11;
    const __VLS_16 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        ...{ 'onClick': {} },
        size: "small",
    }));
    const __VLS_18 = __VLS_17({
        ...{ 'onClick': {} },
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    let __VLS_20;
    let __VLS_21;
    let __VLS_22;
    const __VLS_23 = {
        onClick: (__VLS_ctx.togglePlay)
    };
    __VLS_19.slots.default;
    (__VLS_ctx.playing ? '暂停' : '播放');
    var __VLS_19;
    const __VLS_24 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        ...{ 'onClick': {} },
        size: "small",
        disabled: (__VLS_ctx.modelValue >= __VLS_ctx.total - 1),
    }));
    const __VLS_26 = __VLS_25({
        ...{ 'onClick': {} },
        size: "small",
        disabled: (__VLS_ctx.modelValue >= __VLS_ctx.total - 1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    let __VLS_28;
    let __VLS_29;
    let __VLS_30;
    const __VLS_31 = {
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.total > 0))
                return;
            __VLS_ctx.step(1);
        }
    };
    __VLS_27.slots.default;
    var __VLS_27;
    const __VLS_32 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        ...{ 'onClick': {} },
        size: "small",
    }));
    const __VLS_34 = __VLS_33({
        ...{ 'onClick': {} },
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    let __VLS_36;
    let __VLS_37;
    let __VLS_38;
    const __VLS_39 = {
        onClick: (...[$event]) => {
            if (!(__VLS_ctx.total > 0))
                return;
            __VLS_ctx.emit('update:modelValue', __VLS_ctx.total - 1);
        }
    };
    __VLS_35.slots.default;
    var __VLS_35;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.modelValue + 1);
    (__VLS_ctx.total);
    const __VLS_40 = {}.ElSlider;
    /** @type {[typeof __VLS_components.ElSlider, typeof __VLS_components.elSlider, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        ...{ 'onUpdate:modelValue': {} },
        max: (__VLS_ctx.total - 1),
        min: (0),
        step: (1),
        modelValue: (__VLS_ctx.modelValue),
    }));
    const __VLS_42 = __VLS_41({
        ...{ 'onUpdate:modelValue': {} },
        max: (__VLS_ctx.total - 1),
        min: (0),
        step: (1),
        modelValue: (__VLS_ctx.modelValue),
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    let __VLS_44;
    let __VLS_45;
    let __VLS_46;
    const __VLS_47 = {
        'onUpdate:modelValue': (...[$event]) => {
            if (!(__VLS_ctx.total > 0))
                return;
            __VLS_ctx.emit('update:modelValue', $event);
        }
    };
    var __VLS_43;
}
/** @type {__VLS_StyleScopedClasses['player']} */ ;
/** @type {__VLS_StyleScopedClasses['controls']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            emit: emit,
            playing: playing,
            togglePlay: togglePlay,
            step: step,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=StepPlayer.vue.js.map