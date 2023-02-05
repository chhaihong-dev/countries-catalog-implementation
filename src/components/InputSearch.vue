<script setup lang="ts">
import { ref } from "vue";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/vue/24/solid";

defineProps({
    modelValue: {
        type: String,
        default: "",
    },
    placeholder: {
        type: String,
        default: "",
    },
});

const searchInput = ref("");
const emit = defineEmits(["update:modelValue"]);

const onInput = (e: Event) => {
    setTimeout(() => {
        emit("update:modelValue", (e.target as HTMLInputElement).value);
    }, 250);
};

const onClear = () => {
    emit("update:modelValue", "");
    searchInput.value = "";
};
</script>

<template>
    <div class="relative w-full max-w-sm flex items-center">
        <MagnifyingGlassIcon
            class="absolute z-20 left-0 w-5 ml-2 text-gray-500"
        />
        <input
            type="text"
            name="search"
            v-model="searchInput"
            @input="onInput"
            class="w-full lg:max-w-sm h-10 z-10 border border-sky-900 rounded-lg px-8 py-0"
            :placeholder="placeholder"
            autocomplete="off"
        />

        <XMarkIcon
            class="absolute z-20 w-5 right-0 mr-2 text-gray-500 hover:text-gray-700"
            v-if="searchInput != ''"
            @click="onClear"
        />
    </div>
</template>
