<template>
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-1/3"
  >
    <div
      v-for="test in myTests"
      :key="test"
      class="mb-6 border-2 rounded p-2 cursor-pointer flex justify-between"
    >
      <p @click="checkTests(test)">
        {{ test.test_name }}
      </p>
      <button
        class="border rounded p-1 bg-brand-gray-1 hover:bg-red-300"
        @click="deleteaTest(test.id)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { SET_TEST_DETAILS } from "@/store/constants";
import deleteTest from "@/api/deleteTest";
import getTests from "@/api/getTests";
import { SET_MY_TESTS } from "@/store/constants";

export default defineComponent({
  name: "TestSideBar",
  setup() {
    const store = useStore();
    const myTests = computed(() => store.state.myTests);

    const reqObj = ref(null);
    const checkTests = (test) => {
      store.commit(SET_TEST_DETAILS, test);
    };

    const deleteaTest = async (id) => {
      const res = await deleteTest(id);

      const resp = await getTests();
      store.commit(SET_MY_TESTS, resp);
      console.log(res);
    };

    return { myTests, checkTests, reqObj, deleteaTest };
  },
});
</script>

<style></style>
