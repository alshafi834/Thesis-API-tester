<template>
  <div class="m-8">
    <h2 class="font-semibold text-xl">Scan Your API</h2>
    <div class="flex flex-col mt-8">
      <label for="JsonAPI">Pase your swagger file: </label>
      <textarea
        id="JsonAPI"
        v-model="jsonText"
        name="JsonAPI"
        cols="100"
        rows="17"
        class="border border-solid rounded mt-4 mb-2"
      ></textarea>
      <action-button
        text="Scan Swagger File"
        type="primary"
        @click="jsonToObject"
      />
      <p class="mt-4 mb-4">Or,</p>

      <div class="flex flex-row">
        <input ref="file" type="file" @change="activateBtn" />
        <action-button
          text="Upload Swagger File"
          type="primary"
          :disabled="!btnEnabled"
          @click="readFile"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { SET_API_PATHS } from "@/store/constants";
import ActionButton from "../Shared/ActionButton.vue";
export default defineComponent({
  name: "ApiScanner",
  components: { ActionButton },
  setup() {
    const jsonText = ref("");
    const store = useStore();
    const router = useRouter();

    let file = ref(null);
    let content = ref(null);
    let btnEnabled = ref(false);

    const jsonToObject = () => {
      const ApiObject = JSON.parse(jsonText.value);
      store.commit(SET_API_PATHS, ApiObject);
      router.push({ name: "ApisView" });
    };

    const readFile = () => {
      const reader = new FileReader();
      if (file.value.files[0].name.includes(".json")) {
        reader.onload = (res) => {
          content = JSON.parse(res.target.result);
          store.commit(SET_API_PATHS, content);
          router.push({ name: "ApisView" });
        };
        reader.onerror = (err) => console.log(err);
        reader.readAsText(file.value.files[0]);
      }
    };

    const activateBtn = () => {
      btnEnabled.value = true;
    };

    return {
      jsonText,
      jsonToObject,
      readFile,
      content,
      file,
      activateBtn,
      btnEnabled,
    };
  },
});
</script>
