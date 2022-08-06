<template>
  <div class="w-full border rounded mt-4 p-4">
    <accordion header="Response" :is-open-prop="true">
      <div>
        <div v-for="(response, name) in apiDetails.responses" :key="name">
          <h2>{{ name }}</h2>
          <div>
            <pre v-highlightjs><code class="language-html">
                {
                    description: {{response.description}}
                }</code></pre>
          </div>
        </div>
      </div>
    </accordion>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Accordion from "@/components/Shared/Accordion.vue";
export default {
  name: "Response",
  components: {
    Accordion,
  },
  computed: {
    ...mapState(["apiDetails"]),
  },
};
</script>

<style></style>
