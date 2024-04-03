<script setup lang="ts">
import HeaderItem from "@/components/HeaderItem.vue";
import {computed, ref} from "vue";

interface Keyword {
  word: String,
  count: Number,
  percentage: String,
}

const isWordRegex = new RegExp("[A-Za-zÀ-ÖØ-öø-ÿ]");
const isWhiteSpaceRegex = new RegExp("\\s+");
const isNotWhiteSpaceRegex = new RegExp("\\S+");

const text = ref('');

const wordsCount = computed(
    () => text.value
        .split(isWhiteSpaceRegex)
        .filter((value) => isWordRegex.test(value))
        .length
);

const charactersNoSpaceCount = computed(
    () => text.value
        .split('')
        .filter((value) => isNotWhiteSpaceRegex.test(value))
        .length
);

const charactersCount = computed(
    () => text.value
        .split('')
        .length
);

const whiteSpacesCount = computed(
    () => text.value
        .split('')
        .filter((value) => isWhiteSpaceRegex.test(value))
        .length
);

const sentencesCount = computed(
    () => text.value.split('.')
        .filter((value) => isNotWhiteSpaceRegex.test(value))
        .length
);

const paragraphsCount = computed(
    () => text.value
        .split('\n')
        .filter((value) => isNotWhiteSpaceRegex.test(value))
        .length
);

const keywords = computed(
    () => text.value
        .toLowerCase()
        .split(isWhiteSpaceRegex)
        .filter((value) => isWordRegex.test(value))
        .reduce((accumulator, value, _, arr) => {
          const old = accumulator.find((element) => element.name == value)

          if (typeof old === "undefined") {
            accumulator.push({ word: value, count: 1, percentage: ((1 / arr.length) * 100).toFixed(2)  })
          } else {
            const idx = accumulator.indexOf(old)
            accumulator[idx] = { word: old.word, count: old.count + 1, percentage: (((old.count + 1) / arr.length) * 100).toFixed(2)}
          }

          return accumulator
        }, new Array<Keyword>())
        .sort((a, b) => a.count - b.count)
)
</script>

<template>
  <div class="h-screen w-screen flex items-center justify-center bg-slate-200 font-inter">
    <div class="h-5/6 w-10/12 bg-white shadow-xl flex flex-col">
      <div class="h-1/6 border-b-4 border-slate-50 flex flex-row items-center justify-between px-12">
        <HeaderItem title="Words" :value=wordsCount />
        <HeaderItem title="Characters" :value=charactersNoSpaceCount />
        <HeaderItem title="White spaces" :value=whiteSpacesCount />
        <HeaderItem title="All Characters" :value=charactersCount />
        <HeaderItem title="Sentences" :value=sentencesCount />
        <HeaderItem title="Paragraphs" :value=paragraphsCount />
      </div>

      <div class="h-5/6 flex flex-row">
        <div class="w-7/12">
          <textarea class="h-full w-full outline-none resize-none inline-block p-6" placeholder="Type or paste your text here..." v-model="text" />
        </div>
        <div class="w-5/12 px-6 bg-slate-50 overflow-y-hidden">
          <div class="my-6 uppercase font-semibold text-slate-500">Keywords</div>
          <ul v-if="keywords.length" class="keywords-list overflow-y-auto">
            <li v-for="(keyword, idx) in keywords" :key="idx" class="flex flex-row items-center justify-evenly px-4 py-2 bg-white even:bg-transparent">
              <span class="w-9/12">{{ keyword.word }}</span>
              <div class="w-3/12 flex flex-row items-center justify-around">
                <span class="font-semibold">{{ keyword.count }}</span>
                <span>{{ keyword.percentage }}%</span>
              </div>
            </li>
          </ul>
          <span v-else class="text-slate-500">Type or paste your text to count the keywords</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.keywords-list {
  max-height: calc(100% - 4.5rem);
}
</style>