<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from "vue";
import { useCountryStore } from "@/stores/country";
import InputSearch from "@/components/InputSearch.vue";
import Loading from "@/components/Loading.vue";
import Pagination from "@/components/Pagination.vue";
import Sort from "@/components/Sort.vue";
import CountryGrid from "./CountryGrid.vue";

const countryStore = useCountryStore();

const isAscending = ref(false);

const searchName = ref("");
const countries = computed(() => {
    resetPagination();

    let data = countryStore.countries.slice();
    let countryName = searchName.value || "";

    return data.filter((item: any) =>
        item?.name?.official
            .toLowerCase()
            .trim()
            .includes(countryName.toLowerCase().trim())
    );
});

const index = ref(0);
const perPage = ref(25);
const data = computed(() => {
    let data = countries.value.slice();
    let results = [];

    results = data.slice(index.value, index.value + perPage.value);

    return results;
});

const resetPagination = () => {
    index.value = 0;
    perPage.value = 25;
};

watch(isAscending, (ascending) => {
    countryStore.ascending = !ascending;
    countryStore.getCountries();
});

watch(searchName, (name) => {
    if (name) countryStore.getCountries();
});

onBeforeMount(() => {
    if (!countryStore.hasCountries) countryStore.getCountries();
});
</script>

<template>
    <Loading :spinner="!countryStore.hasCountries" />

    <div
        class="mb-6 flex flex-wrap items-center justify-between space-y-2.5 sm:space-y-0"
    >
        <InputSearch
            v-model="searchName"
            :placeholder="'Search for a country...'"
        />

        <div class="flex items-center space-x-2.5">
            <Sort v-model="isAscending" />
            <Pagination v-model="index" :perPage="perPage" :items="countries" />
        </div>
    </div>

    <CountryGrid v-if="countryStore.hasCountries" :data="data" />
</template>
