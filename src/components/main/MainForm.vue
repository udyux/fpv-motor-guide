<template>
  <section>
    <QuerySelect query-key="prop" :options="propSizeOptions" label="Prop size" class="field" />
    <QuerySelect query-key="quadType" :options="quadTypeOptions" label="Quad type" class="field" />
    <QuerySelect query-key="cellCount" :options="cellCountOptions" label="Cell count" class="field" />
    <QueryInput query-key="weight" label="Weight (g)" fallback-value="630" :mask="weightMask" class="field" />
  </section>
</template>

<script setup lang="ts">
import { propSizes, quadTypes, cellCounts } from '@/models';
import { QueryInput, QuerySelect } from '@/components/query';

const cellCountOptions = cellCounts.map(({ id, label }) => ({ label, value: id }));
const quadTypeOptions = quadTypes.map(({ id, label }) => ({ label, value: id }));
const propSizeOptions = propSizes.map(({ id, label }) => ({ label, value: id }));

function weightMask(value: string) {
  return value.replace(/[^0-9]/g, '');
}
</script>
