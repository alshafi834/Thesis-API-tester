<template>
  <div class="mt-24 p-4">
    <div class="flex items-center justify-center border-b pb-4">
      <p class="ml-4 mr-4">Select a test:</p>
      <select
        v-model="selected"
        name="testOptions"
        class="border rounded mr-2 p-1"
        @change="fetchTests(selected)"
      >
        <option
          v-for="name in apiNames"
          :key="name"
          :value="name.test_api_name"
        >
          {{ name.test_api_name }}
        </option>
      </select>
    </div>
    <div class="flex flex-row flex-wrap w-full mt-6">
      <test-side-bar />
      <test-viewer />
    </div>
  </div>
</template>

<script>
import getTests from "@/api/getTests";
import TestSideBar from "../components/Tests/TestSideBar.vue";
import TestViewer from "../components/Tests/TestViewer.vue";
import { SET_MY_TESTS } from "@/store/constants";
import { useStore } from "vuex";
import { onBeforeMount, ref } from "@vue/runtime-core";
import getApiName from "@/api/getApiName";
export default {
  name: "MyTestsView",
  components: { TestSideBar, TestViewer },
  setup() {
    const store = useStore();
    const fetchTests = async (apiNm) => {
      const resp = await getTests(apiNm);
      store.commit(SET_MY_TESTS, resp);
    };

    const apiNames = ref(null);
    const selected = ref(null);
    onBeforeMount(async () => {
      const resp = await getApiName();
      apiNames.value = resp;
      selected.value = apiNames.value[0].test_api_name;
      const firstCall = await getTests(apiNames.value[0].test_api_name);
      store.commit(SET_MY_TESTS, firstCall);
    });

    return { fetchTests, apiNames, selected };
  },
};
</script>
