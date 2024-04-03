<script setup lang="ts">
import HeaderItem from "@/components/HeaderItem.vue";
import {computed, ref} from "vue";

const isWordRegex = new RegExp("[A-Za-zÀ-ÖØ-öø-ÿ]");
const isWhiteSpaceRegex = new RegExp("\\s+");
const isNotWhiteSpaceRegex = new RegExp("\\S+");

const text = ref('');

const wordsCount = computed(() => text.value.split(isWhiteSpaceRegex).filter((value) => isWordRegex.test(value)).length);
const charactersNoSpaceCount = computed(() => text.value.split('').filter((value) => isNotWhiteSpaceRegex.test(value)).length);
const charactersCount = computed(() => text.value.split('').length);
const whiteSpacesCount = computed(() => text.value.split('').filter((value) => isWhiteSpaceRegex.test(value)).length);
const sentencesCount = computed(() => text.value.split('.').filter((value) => isNotWhiteSpaceRegex.test(value)).length);
const paragraphsCount = computed(() => text.value.split('\n').filter((value) => isNotWhiteSpaceRegex.test(value)).length);
</script>

<template>
  <div class="h-screen w-screen flex items-center justify-center bg-slate-200 font-inter">
    <div class="h-5/6 w-10/12 bg-white shadow-xl flex flex-col">
      <div class="basis-2/12 border-b-4 border-slate-50 flex flex-row items-center justify-between px-12">
        <HeaderItem title="Words" :value=wordsCount />
        <HeaderItem title="Characters" :value=charactersNoSpaceCount />
        <HeaderItem title="White spaces" :value=whiteSpacesCount />
        <HeaderItem title="All Characters" :value=charactersCount />
        <HeaderItem title="Sentences" :value=sentencesCount />
        <HeaderItem title="Paragraphs" :value=paragraphsCount />
      </div>

      <div class="basis-10/12 flex flex-row">
        <textarea class="h-full w-full outline-none resize-none inline-block p-6" placeholder="Type or paste your text here..." v-model="text" />
      </div>
    </div>
  </div>
</template>
