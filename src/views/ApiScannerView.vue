<template>
  <div class="flex flex-row flex-wrap w-full">
    <api-scanner />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ApiScanner from "../components/ApiScanner/ApiScanner.vue";
export default defineComponent({
  name: "ApiScannerView",
  components: { ApiScanner },
});
</script>
