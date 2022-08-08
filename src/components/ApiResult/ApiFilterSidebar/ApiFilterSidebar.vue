<template>
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-1/3"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-xl font-semibold">API Endpoints</h3>
        <div class="flex items-center text-sm">
          <action-button text="Clear filters" type="secondary" />
        </div>
      </div>
    </section>
    <ul>
      <li v-for="(api, name) in apis.paths" :key="name">
        <accordion :header="name">
          <ul>
            <li
              v-for="(endpoint, endpointName) in api"
              :key="endpointName"
              class="mt-2 p-1 border border-solid rounded bg-brand-gray-2 cursor-pointer"
              @click="selectEndpoint(endpoint)"
            >
              {{ endpointName }}
            </li>
          </ul>
        </accordion>
      </li>
    </ul>
  </div>
</template>

<script>
import ActionButton from "../../Shared/ActionButton.vue";
import Accordion from "../../Shared/Accordion.vue";
import { SELECT_ENDPOINT, SET_PARAMETERS } from "@/store/constants";
import { mapState, mapMutations } from "vuex";
export default {
  name: "ApiFilterSidebar",
  components: { ActionButton, Accordion },
  computed: {
    ...mapState(["apis"]),
  },
  /* async mounted() {
    //this.$store.dispatch(FETCH_JOBS);
    this.FETCH_APIS();
  }, */
  methods: {
    //...mapActions([FETCH_APIS]),
    ...mapMutations([SELECT_ENDPOINT]),
    ...mapMutations([SET_PARAMETERS]),
    selectEndpoint(endpoint) {
      this.SELECT_ENDPOINT(endpoint);
      this.SET_PARAMETERS(endpoint.parameters);
    },
  },
};
</script>

<style></style>
,
