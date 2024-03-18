<template>
  <div>
    <div
      v-if="showModal"
      id="addCompanyModal"
      tabindex="-1"
      class="bg-white absolute text-center transform -translate-x-1/2 -translate-y-1/2 border top-1/2 left-1/2"
    >
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg dark:bg-gray-700">
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Add a new company
            </h3>
            <button
              type="button"
              class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              @click="onCloseClick"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          <div class="grid gap-4 mb-4 grid-cols-2 mx-5 mt-5">
            <div class="col-span-2">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Company name</label
              >
              <input
                v-model="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Your company name"
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >NACE code</label
              >
              <input
                v-model="naceCode"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="A1.4.9"
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Gross value added</label
              >
              <input
                v-model="grossValueAdded"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="500000"
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Scope 1 emission</label
              >
              <input
                v-model="emissionScope1"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="5000"
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Scope 2 emission</label
              >
              <input
                v-model="emissionScope2"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="2500"
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Scope 3 emission</label
              >
              <input
                v-model="emissionScope3"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="1000"
              />
            </div>
          </div>

          <div
            v-if="error"
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="font-bold mr-2">Error!</strong>
            <span class="block sm:inline"> {{ error }}.</span>
          </div>

          <div class="flex items-center justify-center mt-2">
            <button
              class="text-white mb-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              @click="onAddCompanyClicked"
            >
              Add company
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <button
    v-if="!showModal"
    type="button"
    class="text-white bg-blue-400 hover:bg-red-400 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-3"
    @click="onAddClicked"
  >
    Create company
  </button>
</template>

<script lang="ts">
const naceRegexp = /[A-U]([0-9][0-9]?)?(.[0-9][0-9]?)?(.[0-9][0-9]?)?/;

export default {
  name: "AddCompanyComponent",
  data() {
    return {
      showModal: false,
      error: undefined,
      name: undefined,
      naceCode: undefined,
      grossValueAdded: undefined,
      emissionScope1: undefined,
      emissionScope2: undefined,
      emissionScope3: undefined,
    };
  },
  methods: {
    validateInput() {
      this.error = undefined;
      if (
        !this.name ||
        !this.naceCode ||
        !this.grossValueAdded ||
        !this.emissionScope1 ||
        !this.emissionScope2 ||
        !this.emissionScope3
      )
        this.error = "Please fill all values";
      else if (
        isNaN(this.grossValueAdded) ||
        isNaN(this.emissionScope1) ||
        isNaN(this.emissionScope2) ||
        isNaN(this.emissionScope3)
      )
        this.error = "Please your inputs, scopes and GVA must be numbers";
      else if (
        this.grossValueAdded < 0 ||
        this.emissionScope1 < 0 ||
        this.emissionScope2 < 0 ||
        this.emissionScope3 < 0
      )
        this.error = "Please your inputs, scopes and GVA must be positive";
      else if (!naceRegexp.test(this.naceCode))
        this.error = "Please check your nace code";
    },
    onAddClicked() {
      this.showModal = true;
    },
    onCloseClick() {
      this.clearData();
    },
    onAddCompanyClicked() {
      this.validateInput();
      if (!this.error) {
        this.$store.dispatch("addCompany", {
          name: this.name,
          naceCode: this.naceCode,
          grossValueAdded: this.grossValueAdded,
          emissionScope1: this.emissionScope1,
          emissionScope2: this.emissionScope2,
          emissionScope3: this.emissionScope3,
        });
        this.clearData();
      }
    },
    clearData() {
      this.showModal = false;
      this.name = undefined;
      this.naceCode = undefined;
      this.grossValueAdded = undefined;
      this.emissionScope1 = undefined;
      this.emissionScope2 = undefined;
      this.emissionScope3 = undefined;
      this.error = undefined;
    },
  },
};
</script>

<style scoped></style>
