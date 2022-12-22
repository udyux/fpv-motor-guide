<template>
  <div class="input-select">
    <button v-if="label" class="input-select__label">
      {{ label }}
    </button>

    <div class="input-select__field" @click.stop>
      <button class="input-select__placeholder" @click="onClickLabel">
        {{ selectedLabel || selected || placeholder || '' }}
        <span class="input-select__indicator" :class="{ '-close': isOpen }" />
      </button>

      <Collapsible :is-open="isOpen" class="input-select__tray" @close-transition-end="onMenuClose">
        <div ref="optionsMenuNode" class="input-select__menu">
          <menu>
            <li v-for="opt in options" :key="opt.value" class="input-select__entry">
              <button
                class="input-select__option"
                :class="{ '-selected': isOptionSelected(opt.value) }"
                @click="setSelection(opt.value)"
              >
                <span class="input-select__check" />
                {{ opt.label || opt.value }}
              </button>
            </li>
          </menu>
        </div>
      </Collapsible>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import SimpleBar from 'simplebar';
import { Collapsible } from '../layout';
import { useRouteQuery } from '@/comps';
import { eventBus } from '@/utils';

enum SelectEvents {
  Open = 'select:open',
}

type Props = {
  queryKey: string;
  options: { label?: string; value: string | number }[];
  label?: string | null;
  placeholder?: string | null;
  isOpenOnMount?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  label: null,
  placeholder: null,
  isOpenOnMount: false,
});

const $route = useRoute();
const { updateQueryKey } = useRouteQuery();
const optionsMenuNode = ref<HTMLDivElement | null>(null);
const isOpen = ref(props.isOpenOnMount);
const simplebarInstance = ref<SimpleBar | null>(null);

const selected = computed(() => {
  return $route.query[props.queryKey] ? String($route.query[props.queryKey]) : null;
});

const selectedLabel = computed(() => props.options.find(({ value }) => String(value) === selected.value)?.label);

watch(isOpen, (newValue: boolean, oldValue: boolean) => {
  if (newValue === oldValue) return;

  if (newValue) {
    document.body.addEventListener('click', closeMenu);
    eventBus.on(SelectEvents.Open, closeMenu);
  } else {
    document.body.removeEventListener('click', closeMenu);
    eventBus.off(SelectEvents.Open, closeMenu);
  }
});

onMounted(async () => {
  await nextTick();
  if (optionsMenuNode.value) simplebarInstance.value = new SimpleBar(optionsMenuNode.value);
});

onBeforeUnmount(() => {
  document.body.removeEventListener('click', closeMenu);
  eventBus.off(SelectEvents.Open, closeMenu);
});

function setSelection(value: string | number) {
  updateQueryKey(props.queryKey, String(value));
  closeMenu();
}

function isOptionSelected(value: string | number) {
  return selected.value === String(value);
}

function onClickLabel() {
  isOpen.value = !isOpen.value;
  eventBus.emit(SelectEvents.Open);
}

function closeMenu() {
  isOpen.value = false;
}

function onMenuClose() {
  if (simplebarInstance.value) simplebarInstance.value.getScrollElement().scrollTop = 0;
}
</script>
