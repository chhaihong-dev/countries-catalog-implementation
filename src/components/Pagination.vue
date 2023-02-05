<script setup lang="ts">
import { ref } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
    modelValue: {
        type: Number,
        default: 0,
    },
    perPage: {
        type: Number,
        default: 0,
    },
    items: {
        type: Object,
        required: true,
    },
});

const currentPage = ref(1);
const emit = defineEmits(["update:modelValue"]);

const prev = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        emit("update:modelValue", currentPage.value);
    }
};

const next = () => {
    if (currentPage.value < Math.round(props.items.length / props.perPage)) {
        currentPage.value++;
        emit("update:modelValue", currentPage.value);
    }
};
</script>

<template>
    <nav class="flex items-center">
        <div class="inline-flex items-center justify-end space-x-2.5">
            <div class="inline-flex items-center">
                <button
                    type="button"
                    @click="prev"
                    class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    <ChevronLeftIcon class="w-4" />
                </button>

                <div class="mx-2 flex select-none items-center space-x-1">
                    <div>{{ props.items.length > 0 ? currentPage : 0 }}</div>
                    <div>/</div>
                    <div>
                        {{ Math.ceil(props.items.length / perPage) ?? 0 }}
                    </div>
                </div>

                <button
                    type="button"
                    @click="next"
                    class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    <ChevronRightIcon class="w-4" />
                </button>
            </div>
        </div>
    </nav>
</template>
