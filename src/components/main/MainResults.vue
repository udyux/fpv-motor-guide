<template>
  <section class="layout__section -row -center">
    <div class="result -reverse-mobile">
      <div class="result__section">
        <h2 class="result__title">Recommended KV range</h2>

        <p>
          Between
          <span class="result__output">{{ lowestKv }}</span>
          and
          <span class="result__output">{{ highestKv }}</span>
        </p>
      </div>

      <div v-if="weightWarning" class="result__section">
        <h2 class="result__title">Weight warning</h2>

        <p>
          Your quad is
          <span class="result__output">{{ weightWarning.warningType }}!</span>
        </p>

        <p>
          Your ideal weight target is
          <span class="result__output">{{ weightWarning.idealWeight }}g</span>
        </p>

        <p>
          You should aim to
          <span class="result__output">{{ weightWarning.solutionType }}</span>
          at least
          <span class="result__output">{{ weightWarning.weightDiff }}g</span>
          for an AUW of
          <span class="result__output">{{ weightWarning.optimalWeight }}g</span>
        </p>
      </div>
    </div>

    <div class="result">
      <h2 class="result__title">Recommended motor sizes</h2>

      <ul>
        <li v-for="motor in validMotors" :key="motor" class="result__output">{{ motor }}</li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { propSizes, defaultPropSize, quadTypes, defaultQuadType, cellCounts, defaultCellCount } from '@/models';
import { useKvRange, useMotorRange, useWeightWarning, useRouteQuery } from '@/comps';
import type { UserInputModel } from '@/types';

const { castQuery } = useRouteQuery();
const query = castQuery<{ weight: number }>({ numbers: ['weight'] });

const model = computed<UserInputModel>(() => {
  const { prop, quadType, cellCount, weight = 630 } = query.value;

  return {
    weight,
    prop: propSizes.find(({ id }) => String(id) === prop) || defaultPropSize,
    quadType: quadTypes.find(({ id }) => String(id) === quadType) || defaultQuadType,
    cellCount: cellCounts.find(({ id }) => String(id) === cellCount) || defaultCellCount,
  };
});

const { lowestKv, highestKv } = useKvRange(model);
const { validMotors } = useMotorRange(model);
const { weightWarning } = useWeightWarning(model);
</script>
