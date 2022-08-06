<template>
  <img :src="imgLink" class="w-8 h-8 object-contain rounded-3xl" alt="" />
</template>

<script>
export default {
  name: "ProfileAvatar",
  data() {
    return {
      imgLink:
        "https://www.pngitem.com/pimgs/m/487-4876417_link-head-png-toon-link-face-png-transparent.png",
    };
  },
};
</script>

<style></style>
