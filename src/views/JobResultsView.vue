<template>
  <div class="flex flex-row flex-nowrap w-full">
    <job-filter-sidebar />
    <job-listing />
  </div>
</template>

<script>
import JobFilterSidebar from "../components/JobResult/JobFilterSidebar/JobFilterSidebar.vue";
import JobListing from "../components/JobResult/JobListings.vue";
export default {
  name: "JobResultsView",
  components: { JobFilterSidebar, JobListing },
};
</script>
