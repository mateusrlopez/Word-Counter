<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
    title: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
});
</script>

<template>
    <div class="flex flex-col">
        <h4 class="mb-2 text-xs font-semibold uppercase text-slate-500">
            {{ title }}
        </h4>
        <span class="text-3xl font-bold">{{ value }}</span>
    </div>
</template>
