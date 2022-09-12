<template>
  <div class="mt-24">
    <div>
      <p @click="fetchTests">Select a test</p>
    </div>
    <div class="flex flex-row flex-wrap w-full">
      <test-side-bar />
      <test-viewer />
    </div>
  </div>
</template>

<script>
import getTests from "@/api/getTests";
import TestSideBar from "../components/Tests/TestSideBar.vue";
import TestViewer from "../components/Tests/TestViewer.vue";
export default {
  name: "MyTestsView",
  components: { TestSideBar, TestViewer },
  setup() {
    const fetchTests = async () => {
      const resp = await getTests();
      console.log(resp);
    };
    return { fetchTests };
  },
};
</script>
