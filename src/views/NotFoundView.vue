<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
    <div class="flex items-center min-h-screen">
        <div>
            <h1 class="text-2xl font-medium">
                You have ventured into 404 page.
            </h1>
            <div>(Page Not Found)</div>
            <RouterLink to="/">>>> Home</RouterLink>
        </div>
    </div>
</template>
