<template>
  <div class="mt-8">
    <h2 class="border-b-2 p-1 mb-1 font-semibold text-lg">Automation tests:</h2>
    <div>
      <p class="p-1">Add a test</p>
    </div>
    <div class="flex flex-row items-center">
      <select
        v-model="selectedTest"
        name="testOptions"
        class="border rounded mr-2 p-1"
      >
        <option value="status">Status</option>
        <option value="contains">Contains</option>
        <option value="conLength">Content.length</option>
        <option value="conType">Content.type</option>
      </select>
      <span>Should be: </span>
      <input
        v-model="selectedTestValue"
        type="text"
        class="border rounded p-1"
      />
      <span
        class="cursor-pointer px-4 py-1 border rounded ml-2 bg-brand-blue-2 text-brand-gray-2"
        @click="createTest"
        >+</span
      >
    </div>
    <div class="flex flex-row">
      <div v-if="automationTests.length > 0" class="mt-8 flex flex-col">
        <div
          v-for="(test, index) in automationTests"
          :key="test"
          class="flex flex-row py-2"
        >
          <p class="italic mr-2">
            -> {{ Object.keys(test)[0] }} : {{ Object.values(test)[0] }}
          </p>
          <button
            class="px-4 py-0 border rounded bg-brand-gray-3 text-brand-gray-2"
            @click="removeTests(index)"
          >
            x
          </button>
        </div>
      </div>
      <div class="py-2 mt-6 ml-6">
        <p v-for="msgs in failedMsgs" :key="msgs" class="py-2">
          <span> {{ msgs === "Passed!" ? " ✅ " : "❌" }} {{ msgs }} </span>
        </p>
      </div>
    </div>
  </div>

  <div class="mt-8">
    <!-- <h2 class="border-b-2 p-1 mb-1">Add automation tests:</h2>
    <div>
      Status should be:
      <select v-model="selected" name="statusCode">
        <option value="200">200</option>
        <option value="201">201</option>
        <option value="403">403</option>
        <option value="401">401</option>
      </select>
    </div>
    <div>
      Response should contain:
      <input v-model="containing" type="text" />
    </div> -->
    <action-button text="Test" @click="checkTests" />
    <div v-if="passed">
      <p class="text-green-600">All test passed successfully!</p>
    </div>
    <!-- <div v-if="!passed">
      <p v-for="msgs in failedMsgs" :key="msgs" class="text-red-600">
        {{ msgs }}
      </p>
    </div> -->
    <div
      v-if="passed"
      class="border-2 mt-6 p-6 flex justify-between bg-white items-center"
    >
      <div>
        <label for="testname">Test name: </label>
        <input
          id="testname"
          v-model="testName"
          class="border-2 rounded p-2"
          type="text"
        />
      </div>
      <action-button text="Save test" @click="testSaver" />
      <p v-if="created" class="text-green-400">Test created successfully!</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs } from "@vue/runtime-core";
import { useStore } from "vuex";
import ActionButton from "../../Shared/ActionButton.vue";
import saveTest from "@/api/saveTest";

export default defineComponent({
  name: "ResponseTester",
  components: { ActionButton },
  props: {
    status: {
      type: String,
      required: true,
    },
    response: {
      type: Object,
      required: true,
    },
    length: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const selected = ref(null);
    const containing = ref("");
    const responsee = toRefs(props);
    const failedMsgs = ref([]);

    const testResult = ref(0);
    const passed = ref(false);

    const checkStatus = (val) => {
      if (props.status === parseInt(val)) {
        testResult.value++;
        failedMsgs.value.push("Passed!");
      } else {
        failedMsgs.value.push("Response status didnt match");
      }
    };
    const checkResponse = (val) => {
      console.log(containing.value);
      if (JSON.stringify(props.response).includes(val)) {
        testResult.value++;
        failedMsgs.value.push("Passed!");
      } else {
        failedMsgs.value.push("Response doesn't contain this text");
      }
    };
    const checkContentL = (val) => {
      if (props.length === val) {
        testResult.value++;
        failedMsgs.value.push("Passed!");
      } else {
        failedMsgs.value.push("Content length didn't match");
      }
    };
    const checkContentT = (val) => {
      if (props.type === val) {
        testResult.value++;
        failedMsgs.value.push("Passed!");
      } else {
        failedMsgs.value.push("Content type didn't match");
      }
    };
    const checkTests = () => {
      testResult.value = 0;
      failedMsgs.value = [];
      passed.value = false;
      for (let t of automationTests.value) {
        let testName = Object.keys(t)[0];
        if (testName === "status") checkStatus(Object.values(t)[0]);
        else if (testName === "contains") checkResponse(Object.values(t)[0]);
        else if (testName === "conLength") checkContentL(Object.values(t)[0]);
        else if (testName === "conType") checkContentT(Object.values(t)[0]);
      }
      if (testResult.value === automationTests.value.length) {
        passed.value = true;
      }
    };

    const selectedTest = ref("status");
    const selectedTestValue = ref("");
    const automationTests = ref([]);
    const createTest = () => {
      console.log(selectedTest.value);
      let obj = { [selectedTest.value]: selectedTestValue.value };
      automationTests.value.push(obj);
    };
    //const testNumber = ref([]);
    const store = useStore();
    const testName = ref("");
    const created = ref(false);
    const testSaver = async () => {
      let body = {
        request: JSON.stringify(store.state.fullRequest),
        atmn_tests: JSON.stringify(automationTests.value),
        test_name: testName.value,
        api_name: store.state.apis.info.title,
      };
      const apRes = await saveTest(body);
      created.value = true;
      console.log(apRes);
    };

    const removeTests = (idx) => {
      automationTests.value.splice(idx, 1);
      failedMsgs.value.splice(idx, 1);
    };

    return {
      selected,
      responsee,
      checkTests,
      passed,
      containing,
      failedMsgs,
      testResult,
      selectedTest,
      selectedTestValue,
      createTest,
      automationTests,
      testSaver,
      testName,
      removeTests,
      created,
    };
  },
});
</script>

<style></style>
