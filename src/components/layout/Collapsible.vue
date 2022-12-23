<template>
  <DynamicElement
    :is="tag"
    class="collapsible"
    :class="{ '-open': isOpen }"
    :style="style"
    @transitionend="onTransitionEnd"
  >
    <DynamicElement ref="contentNode" :tag="contentTag" class="collapsible__content" :class="contentClass">
      <slot />
    </DynamicElement>
  </DynamicElement>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { createLocalEventBus } from '@/utils';
import DynamicElement from './DynamicElement';

type Props = {
  isOpen: boolean;
  tag?: string;
  contentTag?: string;
  contentClass?: string | Record<string, unknown> | (string | Record<string, unknown>)[];
  openHeight?: string | number;
  transitionKey?: string | number | null;
};

const props = withDefaults(defineProps<Props>(), {
  tag: 'div',
  contentTag: 'div',
  contentClass: Array,
  openHeight: 'auto',
  transitionKey: null,
});

const emit = defineEmits<{
  (e: 'transition-end'): void;
  (e: 'open-transition-end'): void;
  (e: 'close-transition-end'): void;
}>();

const ownEvents = createLocalEventBus();
const height = ref(props.isOpen ? props.openHeight : 0);
const contentHeight = ref(0);
const contentNode = ref<ComponentPublicInstance | null>(null);

const style = computed(() => {
  const styleRules: { height: number | string; overflow?: string } = {
    height: !Number(height.value) ? height.value : `${height.value}px`,
  };

  if (height.value === props.openHeight) styleRules.overflow = 'visible';

  return styleRules;
});

watch(
  () => props.isOpen,
  (isOpen, wasOpen) => {
    if (contentNode.value) contentHeight.value = contentNode.value.$el.clientHeight;
    if (isOpen === wasOpen) return;
    if (wasOpen) height.value = contentHeight.value;
    else resetAfterTransition();
    setHeightValue();
  }
);

watch(
  () => props.transitionKey,
  (to, from) => {
    if (to === from || !props.isOpen) return;
    if (contentNode.value) height.value = contentNode.value.$el.clientHeight;
    resetAfterTransition();
    setHeightValue();
  }
);

onMounted(() => {
  if (!contentNode.value) return;
  contentHeight.value = contentNode.value.$el.clientHeight;
  height.value = props.isOpen ? props.openHeight : 0;
});

async function setHeightValue() {
  await nextTick();
  setTimeout(() => {
    height.value = props.isOpen && contentNode.value ? contentNode.value.$el.clientHeight : 0;
  }, 10);
}

function onTransitionEnd() {
  emit('transition-end');
  ownEvents.emit('transition-end');
  if (props.isOpen) emit('open-transition-end');
  else emit('close-transition-end');
}

function resetAfterTransition() {
  ownEvents.once('transition-end', () => {
    if (props.isOpen) height.value = props.openHeight;
  });
}
</script>
