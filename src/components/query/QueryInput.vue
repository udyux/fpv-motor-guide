<template>
  <div class="input-text">
    <label v-if="label" :for="queryKey" class="input-text__label">
      {{ label }}
    </label>

    <input :id="queryKey" v-model="fieldValue" type="text" :name="queryKey" class="input-text__field" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import _debounce from 'lodash.debounce';
import { useRouteQuery } from '@/comps';

type MaskFn = (value: string) => string;

type Props = {
  queryKey: string;
  label?: string | null;
  placeholder?: string | null;
  mask?: MaskFn;
};

const props = withDefaults(defineProps<Props>(), {
  label: null,
  placeholder: null,
  mask: (val: string) => val,
});

const $route = useRoute();
const { updateQueryKey } = useRouteQuery();
const debouncedUpdateQuery = _debounce(updateQueryKey, 250);

const fieldValue = computed({
  get() {
    return $route.query[props.queryKey] ? props.mask($route.query[props.queryKey] as string) : '';
  },
  set(value: string) {
    const maskedValue = props.mask(value);
    debouncedUpdateQuery(props.queryKey, maskedValue, !maskedValue.length || maskedValue === '');
  },
});
</script>
