<script setup lang="ts">
import HeaderItem from '@/components/HeaderItem.vue';
import { computed, ref } from 'vue';

interface Keyword {
    word: string;
    count: number;
    percentage: string;
}

const isWordRegex = new RegExp('[A-Za-zÀ-ÖØ-öø-ÿ]');
const isWhiteSpaceRegex = new RegExp('\\s+');
const isNotWhiteSpaceRegex = new RegExp('\\S+');

const text = ref('');

const wordsCount = computed(
    () => text.value.split(isWhiteSpaceRegex).filter((value) => isWordRegex.test(value)).length
);

const charactersNoSpaceCount = computed(
    () => text.value.split('').filter((value) => isNotWhiteSpaceRegex.test(value)).length
);

const charactersCount = computed(() => text.value.split('').length);

const whiteSpacesCount = computed(
    () => text.value.split('').filter((value) => isWhiteSpaceRegex.test(value)).length
);

const sentencesCount = computed(
    () => text.value.split('.').filter((value) => isNotWhiteSpaceRegex.test(value)).length
);

const paragraphsCount = computed(
    () => text.value.split('\n').filter((value) => isNotWhiteSpaceRegex.test(value)).length
);

const keywords = computed(() =>
    text.value
        .toLowerCase()
        .split(isWhiteSpaceRegex)
        .filter((value) => isWordRegex.test(value))
        .reduce((accumulator, value, _, arr) => {
            const old = accumulator.find((element) => element.word == value);

            if (typeof old === 'undefined') {
                accumulator.push({
                    word: value,
                    count: 1,
                    percentage: ((1 / arr.length) * 100).toFixed(2),
                });
            } else {
                const idx = accumulator.indexOf(old);
                accumulator[idx] = {
                    word: old.word,
                    count: old.count + 1,
                    percentage: (((old.count + 1) / arr.length) * 100).toFixed(2),
                };
            }

            return accumulator;
        }, new Array<Keyword>())
        .sort((a, b) => a.count - b.count)
);
</script>

<template>
    <div class="flex h-screen w-screen items-center justify-center bg-slate-200 font-inter">
        <div class="flex h-5/6 w-10/12 flex-col bg-white shadow-xl">
            <div
                class="flex h-1/6 flex-row items-center justify-between border-b-4 border-slate-50 px-12">
                <HeaderItem title="Words" :value="wordsCount" />
                <HeaderItem title="Characters" :value="charactersNoSpaceCount" />
                <HeaderItem title="White spaces" :value="whiteSpacesCount" />
                <HeaderItem title="All Characters" :value="charactersCount" />
                <HeaderItem title="Sentences" :value="sentencesCount" />
                <HeaderItem title="Paragraphs" :value="paragraphsCount" />
            </div>

            <div class="flex h-5/6 flex-row">
                <div class="w-7/12">
                    <textarea
                        v-model="text"
                        class="inline-block h-full w-full resize-none p-6 outline-none"
                        placeholder="Type or paste your text here..." />
                </div>
                <div class="w-5/12 overflow-y-hidden bg-slate-50 px-6">
                    <div class="my-6 font-semibold uppercase text-slate-500">Keywords</div>
                    <ul v-if="keywords.length" class="keywords-list overflow-y-auto">
                        <li
                            v-for="(keyword, idx) in keywords"
                            :key="idx"
                            class="flex flex-row items-center justify-evenly bg-white px-4 py-2 even:bg-transparent">
                            <span class="w-9/12">{{ keyword.word }}</span>
                            <div class="flex w-3/12 flex-row items-center justify-around">
                                <span class="font-semibold">{{ keyword.count }}</span>
                                <span>{{ keyword.percentage }}%</span>
                            </div>
                        </li>
                    </ul>
                    <span v-else class="text-slate-500">
                        Type or paste your text to count the keywords
                    </span>
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
