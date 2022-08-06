<template>
  <div class="w-full border-b border-solid border-brand-gray-1">
    <div class="mx-auto my-16 text-center">
      <slot>Sample title</slot>
      <!-- a slot with no name is the default slot -->
      <slot name="subtitle">Sample subtitle</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style></style>
