<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  title: String,
  value: Number,
});
</script>

<template>
  <div class="flex flex-col">
    <h4 class="text-xs uppercase mb-2 text-slate-500 font-semibold">{{ title }}</h4>
    <span class="font-bold text-3xl">{{ value }}</span>
  </div>
</template>