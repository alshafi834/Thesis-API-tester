<template>
  <header-container>
    <template #default>
      <h1 class="w-full text-4xl font-normal">Documentation</h1>
    </template>
    <template #subtitle>
      <h2 class="w-full my-4 text-base font-light">
        Step by step documentation to connect and test your API
      </h2>
    </template>
  </header-container>
</template>

<script>
import HeaderContainer from "../components/Shared/HeaderContainer.vue";
export default {
  components: { HeaderContainer },
};
</script>

<style></style>
