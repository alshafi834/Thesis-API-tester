<template>
  <h2 class="font-semibold text-xl">API tester</h2>
  <div class="flex flex-row mt-8">
    <input
      v-model="baseUrl"
      type="text"
      placeholder="API endpoint"
      class="w-3/4 pl-4 border border-solid rounded"
    />
    <action-button text="Submit" type="primary" class="w-1/4 ml-4" />
  </div>
  <div class="mt-4">
    <div class="flex flex-row mb-2 border-b-2 border-gray-500">
      <h2
        class="mr-2 p-2 cursor-pointer"
        :class="tab === 'body' ? 'tab' : ''"
        @click="changeTab('body')"
      >
        Body(JSON)
      </h2>
      <h2
        class="mr-2 p-2 cursor-pointer"
        :class="tab === 'query' ? 'tab' : ''"
        @click="changeTab('query')"
      >
        Query Param
      </h2>
      <h2
        class="mr-2 p-2 cursor-pointer"
        :class="tab === 'header' ? 'tab' : ''"
        @click="changeTab('header')"
      >
        Auth Header
      </h2>
    </div>
    <div v-if="tab === 'body'">
      <textarea
        id="input"
        name="input"
        cols="100"
        rows="6"
        class="w-full p-4 border border-solid rounded"
      ></textarea>
    </div>
    <div v-if="tab === 'query'">
      <div
        v-for="param in queryParams.parameters"
        :key="param"
        class="flex flex-row mb-2"
      >
        <input type="checkbox" :checked="param.required" class="mr-2 p-2" />
        <input
          type="text"
          :value="param.name"
          placeholder="Query Parameter"
          class="p-2 w-1/4 border rounded mr-4"
        />
        <input
          type="text"
          placeholder="Value"
          class="p-2 w-2/4 border rounded"
          :disabled="!param.required"
        />
      </div>
    </div>
    <div v-if="tab === 'header'">
      <div class="flex flex-row">
        <input
          type="text"
          placeholder="Header"
          class="p-2 w-1/4 border rounded mr-4"
        />
        <input
          type="text"
          placeholder="value"
          class="p-2 w-2/4 border rounded"
        />
      </div>
    </div>
  </div>
  <div class="mt-6">
    <h2 class="mb-2">Response:</h2>
    <div class="w-full h-24 border border-solid rounded bg-white"></div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import ActionButton from "../../Shared/ActionButton.vue";
export default defineComponent({
  name: "ApiTester",
  components: { ActionButton },

  setup() {
    const store = useStore();
    let baseUrl = ref("");
    const apis = computed(() => store.state.apis);

    baseUrl = apis.value.host + apis.value.basePath;

    const tab = ref("body");
    const changeTab = (tabName) => {
      tab.value = tabName;
    };

    const queryParams = computed(() => store.state.apiDetails);
    return { apis, baseUrl, changeTab, tab, queryParams };
  },
  /* computed: {
    ...mapState(["apiDetails"]),
  }, */
});
</script>

<style scoped>
.tab {
  @apply font-semibold bg-gray-200 border-b-0 border-solid rounded-t border-gray-500;
}
</style>
