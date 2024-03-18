<script lang="ts">
import CompaniesComponent from "./components/CompaniesComponent.vue";
import AddCompanyComponent from "./components/AddCompanyComponent.vue";

export default {
  components: { AddCompanyComponent, CompaniesComponent },
};
</script>

<template>
  <div class="flex items-center justify-center flex-col">
    <h2 class="text-4xl font-bold dark:text-white mb-5 mt-2">Right.</h2>
    <CompaniesComponent />
    <add-company-component />
  </div>
</template>

<style scoped></style>
