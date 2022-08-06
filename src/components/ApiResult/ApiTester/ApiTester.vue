<template>
  <h2 class="font-semibold text-xl">API tester</h2>
  <div class="flex flex-row mt-8">
    <input
      type="text"
      placeholder="API endpoint"
      class="w-3/4 pl-4 border border-solid rounded"
    />
    <action-button text="Submit" type="primary" class="w-1/4 ml-4" />
  </div>
  <div class="mt-4">
    <h2 class="mb-2">Body(JSON):</h2>
    <textarea
      id="input"
      name="input"
      cols="100"
      rows="6"
      class="w-full p-4 border border-solid rounded"
    ></textarea>
  </div>
  <div class="mt-6">
    <h2 class="mb-2">Response:</h2>
    <div class="w-full h-24 border border-solid rounded bg-white"></div>
  </div>
</template>

<script>
import ActionButton from "../../Shared/ActionButton.vue";
export default {
  name: "ApiTester",
  components: { ActionButton },
};
</script>

<style></style>
