<template>
  <auth />
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import Auth from "../components/Auth/Auth.vue";

export default defineComponent({
  name: "AuthView",
  components: { Auth },
});
</script>

<style></style>
