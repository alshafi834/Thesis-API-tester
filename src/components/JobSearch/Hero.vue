<template>
  <main class="flex flex-col h-screen">
    <section class="flex flex-col pt-10 pb-20">
      <div class="grid grid-cols-12">
        <div class="col-start-1 col-span-1"></div>
        <div class="col-start-2 col-span-5">
          <headline />
          <!-- <job-search-form /> -->
        </div>
        <div class="col-start-7 col-span-5 self-center justify-self-center">
          <img
            class="w-85 h-85 rounded-t-full object-contain"
            src="https://blog.testproject.io/wp-content/uploads/2021/06/API-testing-101.jpg"
            alt="banner"
          />
        </div>
        <div class="col-start-12 col-span-1"></div>
      </div>
      <div class="flex justify-center">
        <router-link to="/auth">
          <button
            v-if="!isLoggedIn"
            class="px-8 py-4 border-2 rounded border-brand-blue-1 hover:bg-blue-400 hover:text-white"
          >
            Sign In to start testing your API
          </button>
        </router-link>
      </div>
    </section>
    <!-- <spotlight class="flex flex-row justify-center pb-16">
      <template #default="{ img, title, description }">
        <router-link
          to="/jobs/results"
          class="flex flex-col mx-5 border rounded-lg w-72 bg-brand-gray-2 h-96"
        >
          <img :src="img" alt="spotlight-image" class="object-contain" />
          <div class="h-48 px-6 py-4 mt-3">
            <h3 class="text-lg font-medium">{{ title }}</h3>
            <p class="mt-3 text-sm">
              {{ description }}
            </p>
          </div>

          <router-link
            to="/jobs/results"
            class="px-6 pb-4 text-sm text-brand-blue-1"
            >See Jobs</router-link
          >
        </router-link>
      </template>
    </spotlight> -->
  </main>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import Headline from "./Headline.vue";
//import JobSearchForm from "./JobSearchForm.vue";
//import Spotlight from "./Spotlight.vue";
export default {
  name: "Hero",
  components: { Headline },
  setup() {
    const store = useStore();
    const isLoggedIn = computed(() => store.state.isLoggedIn);
    return {
      isLoggedIn,
    };
  },
};
</script>
