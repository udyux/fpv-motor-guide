<template>
  <div class="hello">
    <h1>{{ capMsg }}</h1>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ msg?: string | number }>(), { msg: '' });
const capMsg = String(props.msg).replace(/^(.)/, (x, $1) => $1.toUpperCase());
</script>
