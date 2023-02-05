<script setup lang="ts">
import { computed, ref } from "vue";
import { useCountryStore } from "@/stores/country";
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from "@headlessui/vue";

const countryStore = useCountryStore();

const props = defineProps({
    data: {
        type: Object,
        required: false,
    },
});

const item = computed(() => {
    return props.data;
});

const isOpen = ref(false);
function closeModal() {
    isOpen.value = false;
}

const getCountry = async (name: string) => {
    console.log("clicked on: " + name);
    await countryStore.getCountry(name);
    isOpen.value = true;
};
</script>

<template>
    <div>
        <img
            class="w-full h-[180px] object-cover rounded-t-lg shadow-sm"
            :src="item?.flags?.png"
            :alt="item?.name?.common"
        />
        <div class="p-2.5">
            <button
                type="button"
                @click="getCountry(item?.name?.common)"
                class="mt-4 mb-2.5 text-left text-lg font-semibold text-sky-900 hover:text-sky-700"
            >
                {{ item?.name?.official }}
            </button>

            <div class="space-y-1 text-sm">
                <div class="text-sm">
                    <span class="font-medium">Country Code 2:&nbsp;</span>
                    <span>{{ item?.cca2 }}</span>
                </div>
                <div class="text-sm">
                    <span class="font-medium">Country Code 3:&nbsp;</span>
                    <span>{{ item?.cca3 }}</span>
                </div>
                <div v-if="item?.name?.nativeName" class="text-sm">
                    <span class="font-medium">Native Country Name:&nbsp;</span>
                    <span>{{
                        item?.name?.nativeName[
                            Object.keys(item?.name?.nativeName)[0]
                        ].official
                    }}</span>
                </div>
                <div class="text-sm">
                    <span class="font-medium">Country Calling Codes:</span>
                    <span>{{
                        item?.idd?.root + item?.idd?.suffixes?.[0]
                    }}</span>
                </div>
                <div class="flex flex-wrap text-sm">
                    <span class="font-medium"
                        >Alternative Country Name:&nbsp;</span
                    >
                    <span
                        class="bg-sky-700 text-sky-50 text-xs font-medium truncate my-0.5 mr-1.5 px-2.5 py-0.5 rounded"
                        v-for="altSpellings in item?.altSpellings"
                        :key="altSpellings"
                        >{{ altSpellings }}</span
                    >
                </div>
            </div>
        </div>
    </div>

    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div
                    class="flex items-center justify-center min-h-full p-4 text-center"
                >
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            class="w-full max-w-3xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
                        >
                            <DialogTitle
                                as="h3"
                                class="text-lg font-medium leading-6 text-gray-900"
                            >
                                The Country Details
                            </DialogTitle>
                            <div class="mt-2">
                                <code>
                                    <pre>{{ countryStore.country }}</pre>
                                </code>
                            </div>

                            <div class="mt-4">
                                <button
                                    type="button"
                                    class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    @click="closeModal"
                                >
                                    Close
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
