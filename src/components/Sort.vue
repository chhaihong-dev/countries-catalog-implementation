<script setup lang="ts">
import { ref } from "vue";
import { BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/vue/24/solid";

defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["update:modelValue"]);
const isAscending = ref(false);

const sorting = () => {
    isAscending.value = !isAscending.value;
    emit("update:modelValue", isAscending.value);
};
</script>

<template>
    <button
        @click="sorting"
        class="flex items-center space-x-2.5 text-gray-600 hover:text-gray-900"
    >
        <div v-if="!isAscending" class="flex items-center space-x-1.5">
            <BarsArrowDownIcon class="w-5" />
            <div class="uppercase">Ascending</div>
        </div>
        <div v-else class="flex items-center space-x-1.5">
            <BarsArrowUpIcon class="w-5" />
            <div class="uppercase">Descending</div>
        </div>
    </button>
</template>
