<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
    spinner: {
        type: Boolean,
        required: true,
    },
});

const loading = computed(() => {
    return props.spinner;
});
</script>

<template>
    <div
        v-if="loading"
        class="inline-flex items-center text-sm leading-tight font-medium text-gray-700 transition duration-150 ease-in-out"
    >
        <svg
            class="w-6 h-6 mr-2.5 -ml-1 text-gray-700 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="2.5"
            ></circle>
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
        <span>loading...</span>
    </div>
</template>
