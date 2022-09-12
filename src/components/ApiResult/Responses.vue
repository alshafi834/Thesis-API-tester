<template>
  <div class="w-full border rounded mt-4 p-4">
    <accordion header="Response" :is-open-prop="true">
      <div v-if="apiDetails">
        <div v-for="(response, name) in apiDetails" :key="name" class="mb-4">
          <p>{{ name }}: {{ response.description }}</p>
        </div>
      </div>
    </accordion>
  </div>
</template>

<script>
import { useStore } from "vuex";
import Accordion from "@/components/Shared/Accordion.vue";
import { computed } from "@vue/runtime-core";
export default {
  name: "Response",
  components: {
    Accordion,
  },
  setup() {
    const store = useStore();
    //let baseUrl = ref("");
    const apiDetails = computed(() => store.state.responses);
    console.log(apiDetails);

    return {
      apiDetails,
    };
  },
  /* computed: {
    ...mapState(["apiDetails"]),
  }, */
};
</script>

<style></style>
