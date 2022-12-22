<template>
  <label class="input-toggle" @click="onClickWrapper">
    <input v-model="isChecked" type="checkbox" :name="queryKey" class="input-toggle__field" />

    <span class="input-toggle__label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRouteQuery } from '@/comps';

type Props = {
  queryKey: string;
  value: string | boolean;
  isDefault?: boolean;
};

const props = withDefaults(defineProps<Props>(), { isDefault: false });
const $route = useRoute();
const { updateQueryKey } = useRouteQuery();

const queryValue = computed(() => {
  if (props.value === true) return Boolean($route.query[props.queryKey]);
  const stringFallback = props.isDefault ? props.value : '';
  return $route.query[props.queryKey] || stringFallback;
});

const isChecked = computed({
  get() {
    if (typeof queryValue.value === 'boolean') return queryValue.value;
    if (!queryValue.value || !queryValue.value.length) return props.isDefault;
    return queryValue.value === props.value;
  },
  set(isCheckedValue: boolean) {
    if (typeof props.value === 'boolean') updateQueryKey(props.queryKey, isCheckedValue, !isCheckedValue);
    else updateQueryKey(props.queryKey, props.value, props.isDefault);
  },
});

function onClickWrapper(event: MouseEvent) {
  if (typeof queryValue.value === 'string' && isChecked.value) return event.preventDefault();
}
</script>
