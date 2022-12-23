<template>
  <main class="layout">
    <h1 class="layout__title">FPV Motor Guide</h1>

    <div>
      <MainForm class="layout__section -row -center" />
      <MainResults v-if="isFormComplete" class="layout__section -row -center" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { defaultPropSize, defaultQuadType, defaultCellCount } from '@/models';
import { useRouteQuery } from '@/comps';
import { MainForm, MainResults } from '@/components/main';
import { UserInputModelFields } from '@/types';

const { updateQuery, castQuery } = useRouteQuery();
const query = castQuery<{ weight: number }>({ numbers: ['weight'] });

const isFormComplete = computed(() =>
  Object.values(UserInputModelFields).every(field => query.value[field] !== undefined)
);

onBeforeMount(() => {
  const {
    weight = 630,
    prop = defaultPropSize.id,
    quadType = defaultQuadType.id,
    cellCount = defaultCellCount.id,
  } = query.value;

  updateQuery({ weight, prop, quadType, cellCount });
});
</script>
