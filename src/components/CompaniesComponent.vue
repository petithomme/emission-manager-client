<template>
  <div class="relative overflow-x-auto sm:rounded-lg">
    <table
      class="text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 mx-10"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">
            <CompanyTableHeadComponent :name="'name'" :order-type="'name'" />
          </th>
          <th scope="col" class="px-6 py-3">
            <CompanyTableHeadComponent
              :name="'Nace code'"
              :order-type="'nace'"
            />
          </th>
          <th scope="col" class="px-6 py-3">
            <CompanyTableHeadComponent
              :name="'Gross value added'"
              :order-type="'gva'"
            />
          </th>
          <th scope="col" class="px-6 py-3">
            <CompanyTableHeadComponent
              :name="'Emission Scope 1'"
              :order-type="'es1'"
            />
          </th>
          <th scope="col" class="px-6 py-3">
            <CompanyTableHeadComponent
              :name="'Emission Scope 2'"
              :order-type="'es2'"
            />
          </th>
          <th scope="col" class="px-6 py-3">
            <CompanyTableHeadComponent
              :name="'Emission Scope 3'"
              :order-type="'es3'"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="company in this.$store.getters.getCompaniesOrdered"
          :key="company.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <td
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ company.name }}
          </td>
          <td px-6 py-4>{{ company.naceCode }}</td>
          <td px-6 py-4>{{ company.grossValueAdded }}</td>
          <td px-6 py-4>{{ company.emissionScope1 }}</td>
          <td px-6 py-4>{{ company.emissionScope2 }}</td>
          <td px-6 py-4>{{ company.emissionScope3 }}</td>
          <td px-6 py-4>
            <button type="button" class="cursor-pointer">
              <svg
                @click="deleteCompany(company.id)"
                class="h-8 w-8 text-black-500"
                fill="none"
                viewBox="0 0 30 30"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import CompanyTableHeadComponent from "./CompanyTableHeadComponent.vue";
export default {
  name: "CompaniesComponent",
  components: { CompanyTableHeadComponent },
  methods: {
    deleteCompany(id: number) {
      this.$store.dispatch("deleteCompany", id);
    },
  },
};
</script>

<style scoped></style>
