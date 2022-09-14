<template>
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-1/3"
  >
    <div v-for="test in myTests" :key="test">
      <p
        class="mb-6 border-2 rounded p-2 cursor-pointer"
        @click="checkTests(test)"
      >
        {{ test.test_name }}
      </p>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { SET_TEST_DETAILS } from "@/store/constants";

export default defineComponent({
  name: "TestSideBar",
  setup() {
    const store = useStore();
    const myTests = computed(() => store.state.myTests);

    const reqObj = ref(null);
    const checkTests = (test) => {
      store.commit(SET_TEST_DETAILS, test);
    };

    return { myTests, checkTests, reqObj };
  },
});
</script>

<style></style>
