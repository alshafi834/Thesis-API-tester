<template>
  <div class="flex flex-row flex-wrap w-full">
    <api-filter-sidebar />
    <api-listings />
  </div>
</template>

<script>
import ApiFilterSidebar from "../components/ApiResult/ApiFilterSidebar/ApiFilterSidebar.vue";
import ApiListings from "../components/ApiResult/ApiListings.vue";
export default {
  name: "ApisView",
  components: { ApiFilterSidebar, ApiListings },
};
</script>
