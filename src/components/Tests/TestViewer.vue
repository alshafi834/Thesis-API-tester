<template>
  <div class="flex-auto w-2/3 p-8 bg-brand-gray-2">
    <h2 class="font-semibold text-2xl">Test Details</h2>
    <div>
      <p>Test name: {{ testDetails.name }}</p>
      <p>Request URL: {{ testDetails.request }}</p>
      <div class="mt-4 mb-4">
        <h2 class="underline">Automation tests:</h2>
        <ul>
          <li v-for="test in testDetails.tests" :key="test">
            Expect => {{ Object.keys(test)[0] }} as {{ Object.values(test)[0] }}
          </li>
        </ul>
      </div>
      <action-button text="Test" @click="callTester" />
      <div v-if="!passed">
        <p v-for="msgs in failedMsgs" :key="msgs" class="text-red-600">
          {{ msgs }}
        </p>
      </div>
      <div v-if="passed">
        <p class="text-green-600">All test passed successfully!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import ActionButton from "../Shared/ActionButton.vue";
import testCaller from "@/api/testCaller";

export default defineComponent({
  name: "TestViewer",
  components: { ActionButton },
  setup() {
    const store = useStore();
    const testDetails = computed(() => {
      const details = {
        id: store.state.testDetails.id,
        name: store.state.testDetails.test_name,
        request: store.state.testDetails.request
          ? JSON.parse(store.state.testDetails.request)
          : null,
        testName: store.state.testDetails.test_name,
        tests: store.state.testDetails.atmn_tests
          ? JSON.parse(store.state.testDetails.atmn_tests)
          : null,
      };
      return details;
    });

    const failedMsgs = ref([]);

    const testResult = ref(0);
    const passed = ref(false);

    const checkStatus = (val, res) => {
      if (res.status === parseInt(val)) {
        testResult.value++;
      } else {
        failedMsgs.value.push("Response status didnt match");
      }
    };
    const checkResponse = (val, res) => {
      if (JSON.stringify(res.data).includes(val)) {
        testResult.value++;
      } else {
        failedMsgs.value.push("Response doesn't contain this text");
      }
    };

    const callTester = async () => {
      const apRes = await testCaller(testDetails.value.request);
      console.log(apRes);

      testResult.value = 0;
      failedMsgs.value = [];
      passed.value = false;
      for (let t of testDetails.value.tests) {
        let testName = Object.keys(t)[0];
        if (testName === "status") checkStatus(Object.values(t)[0], apRes.res);
        else if (testName === "contains")
          checkResponse(Object.values(t)[0], apRes.res);
      }
      if (testResult.value === testDetails.value.tests.length) {
        passed.value = true;
      }
    };

    return {
      testDetails,
      callTester,
      passed,
      failedMsgs,
    };
  },
});
</script>

<style></style>
