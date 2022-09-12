<template>
  <div class="mt-8">
    <h2 class="border-b-2 p-1 mb-1">Automation tests:</h2>
    <div>
      <p>Add a test</p>
    </div>
    <div class="flex flex-row">
      <select v-model="selectedTest" name="testOptions">
        <option value="status">Status</option>
        <option value="contains">Contains</option>
        <option value="conLength">Content.length</option>
        <option value="conType">Content.type</option>
      </select>
      <span>Should be: </span>
      <input v-model="selectedTestValue" type="text" />
      <span class="cursor-pointer border p-1 ml-2" @click="createTest">+</span>
    </div>
    <div v-if="automationTests.length > 0" class="mt-8">
      <div v-for="test in automationTests" :key="test">
        <p class="italic">
          -> {{ Object.keys(test)[0] }} : {{ Object.values(test)[0] }}
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
    <div v-if="!passed">
      <p v-for="msgs in failedMsgs" :key="msgs" class="text-red-600">
        {{ msgs }}
      </p>
    </div>
    <action-button text="Save test" @click="testSaver" />
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
      } else {
        failedMsgs.value.push("Response status didnt match");
      }
    };
    const checkResponse = (val) => {
      console.log(containing.value);
      if (JSON.stringify(props.response).includes(val)) {
        testResult.value++;
      } else {
        failedMsgs.value.push("Response doesn't contain this text");
      }
    };
    const checkTests = () => {
      /* testResult.value = 0;
      failedMsgs.value = [];
      passed.value = false;
      checkStatus();
      checkResponse(props.response);
      if (testResult.value === 2) {
        passed.value = true;
      } */
      testResult.value = 0;
      failedMsgs.value = [];
      passed.value = false;
      for (let t of automationTests.value) {
        let testName = Object.keys(t)[0];
        if (testName === "status") checkStatus(Object.values(t)[0]);
        else if (testName === "contains") checkResponse(Object.values(t)[0]);
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
    const testSaver = async () => {
      let body = {
        request: JSON.stringify(store.state.fullRequest),
        atmn_tests: JSON.stringify(automationTests.value),
        test_name: "mytest",
      };
      const apRes = await saveTest(body);
      console.log(apRes);
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
    };
  },
});
</script>

<style></style>
