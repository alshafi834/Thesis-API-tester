<template>
  <main class="flex-auto w-2/3 p-8 bg-brand-gray-2">
    <h2 class="text-xl mb-2 font-semibold">{{ apiDetails.summary }}</h2>
    <h3>{{ apiDetails.description }}</h3>
    <api-tester />
    <div class="flex flex-col mt-6">
      <h2 class="mb-2 font-semibold text-xl">Documentation</h2>
      <parameters />
      <responses />
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
import ApiTester from "./ApiTester/ApiTester.vue";
import Parameters from "./Parameters.vue";
import Responses from "./Responses.vue";

export default {
  name: "ApiListings",
  components: { Parameters, Responses, ApiTester },
  computed: {
    ...mapState(["apiDetails"]),
  },
};
</script>

<style></style>
