<template>
  <main class="layout">
    <fieldset class="field">
      <label class="field__label" for="propSize">Prop size</label>
      <select id="propSize" v-model="model.prop" class="field__input">
        <option v-for="prop in propSizes" :key="prop.size" :value="prop">{{ prop.size }}"</option>
      </select>
    </fieldset>

    <fieldset class="field">
      <label class="field__label" for="quadType">Quad type</label>
      <select id="quadType" v-model="model.quadType" class="field__input">
        <option v-for="quad in quadTypes" :key="quad.label" :value="quad">{{ quad.label }}</option>
      </select>
    </fieldset>

    <fieldset class="field">
      <label class="field__label" for="weight">Cell count</label>
      <select v-model="model.cellCount" class="field__input">
        <option v-for="count in cellCounts" :key="count.label" :value="count">{{ count.label }}</option>
      </select>
    </fieldset>

    <fieldset class="field">
      <label class="field__label" for="weight">Weight (g)</label>
      <input id="weight" v-model="model.weight" class="field__input" type="number" />
    </fieldset>

    <div class="result">
      <br />
      <br />
      <p class="result__label">KV</p>
      <p class="result__output">{{ lowestKv }}</p>
      <p class="result__output">{{ highestKv }}</p>
      <br />
      <br />
      <p class="result__label">Motor</p>
      <p class="result__output">{{ minMotorSize }}</p>
      <p class="result__output">{{ maxMotorSize }}</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { UserInputModel } from './types';
import { propSizes, defaultPropSize, quadTypes, defaultQuadType, cellCounts, defaultCellCount } from './models';
import { useKvRange, useMotorRange } from './comps';

const model: UserInputModel = reactive({
  prop: defaultPropSize,
  quadType: defaultQuadType,
  cellCount: defaultCellCount,
  weight: 630,
});

const { lowestKv, highestKv } = useKvRange(model);
const { minMotorSize, maxMotorSize } = useMotorRange(model);
// const discLoad = computed(() => model.weight / model.prop.area);
</script>
