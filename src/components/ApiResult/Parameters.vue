<template>
  <div class="w-full border rounded mt-4 p-4">
    <accordion header="Input Parameters" :is-open-prop="true">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr class="bg-white border-b">
            <th class="py-3 px-6">Name</th>
            <th class="py-3 px-6">Type</th>
            <th class="py-3 px-6">Required</th>
            <th class="py-3 px-6">Where</th>
          </tr>
        </thead>
        <tbody v-for="(parameter, name) in parameters" :key="name">
          <tr v-for="param in parameter" :key="param" class="bg-white border-b">
            <td class="py-4 px-6">{{ param.name }}</td>
            <td class="py-4 px-6">{{ param.type || "null" }}</td>
            <td class="py-4 px-6">{{ param.required }}</td>
            <td class="py-4 px-6">{{ param.in }}</td>
          </tr>
        </tbody>
      </table>
    </accordion>
  </div>
</template>

<script>
import Accordion from "@/components/Shared/Accordion.vue";
import { mapState } from "vuex";
export default {
  name: "Parameter",
  components: {
    Accordion,
  },
  computed: {
    ...mapState(["parameters"]),
  },
};
</script>

<style></style>
