<script setup lang="ts">
import { computed } from "vue";
import CountryCard from "./CountryCard.vue";
import { TransitionRoot, TransitionChild } from "@headlessui/vue";

const props = defineProps({
    data: {
        type: Object,
        required: false,
    },
});

const items = computed(() => {
    return props.data;
});
</script>

<template>
    <TransitionRoot
        :show="true"
        as="ul"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
        <li
            v-for="(item, idx) in items"
            :key="idx"
            class="flex flex-col col-span-1 bg-white divide-y divide-gray-200 rounded-lg shadow hover:shadow-md"
        >
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <CountryCard :data="item" />
            </TransitionChild>
        </li>
    </TransitionRoot>
</template>
