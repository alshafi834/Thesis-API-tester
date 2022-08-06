<template>
  <div
    class="flex flex-col p-4 bg-white border-r border-solid border-brand-gray-1 w-1/3"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do You want to do</h3>
        <div class="flex items-center text-sm">
          <action-button text="Clear filters" type="secondary" />
        </div>
      </div>

      <!-- <accordion header="Degree" />
      <accordion header="Job Types">Job types hahaha</accordion> -->
      <job-filter-sidebad-organizations />
    </section>
  </div>
</template>

<script>
//import Accordion from "../../Shared/Accordion.vue";
import ActionButton from "../../Shared/ActionButton.vue";
import JobFilterSidebadOrganizations from "./JobFilterSidebadOrganizations.vue";
export default {
  name: "JobFilterSidebar",
  components: { ActionButton, JobFilterSidebadOrganizations },
};
</script>

<style></style>
,
