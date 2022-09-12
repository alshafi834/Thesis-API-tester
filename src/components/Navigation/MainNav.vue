<template>
  <!-- <header :class="(['w-full', 'text-sm'], headerHeightClass)"> -->
  <header :class="['w-full', 'text-sm']">
    <div class="fixed top-0 left-0 w-full h-16 bg-brand-blue-2">
      <div
        class="flex flex-nowrap h-full px-8 mx-auto border-b border-solid border-brand-gray-1"
      >
        <router-link to="/" class="flex items-center h-full text-xl"
          >trivago API tester |</router-link
        >
        <nav v-if="isLoggedIn" class="h-full ml-12">
          <ul class="flex h-full p-0 m-0 list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.text"
              class="h-full ml-9 first:ml-0"
              data-test="main-nav-list-item"
            >
              <router-link
                :to="menuItem.url"
                class="flex items-center h-full py-2.5"
                >{{ menuItem.text }}</router-link
              >
            </li>
          </ul>
        </nav>

        <div class="flex items-center h-full ml-auto">
          <!-- <profile-avatar v-if="isLoggedIn" data-test="profile-image" /> -->
          <router-link to="/">
            <action-button v-if="isLoggedIn" text="Sign Out" @click="signOut" />
          </router-link>
          <router-link to="/auth">
            <action-button
              v-if="!isLoggedIn"
              data-test="login-button"
              text="Sign In"
            />
          </router-link>
        </div>
      </div>

      <!-- <sub-nav v-if="isLoggedIn" data-test="subnav" /> -->
    </div>
  </header>
</template>

<script>
import ActionButton from "@/components/Shared/ActionButton.vue";
//import ProfileAvatar from "./ProfileAvatar.vue";
//import SubNav from "./SubNav.vue";
//import { LOGIN_USER } from "@/store/constants";
import { LOGOUT_USER } from "@/store/constants";
import { mapState, useStore } from "vuex";
export default {
  name: "MainNav",
  components: {
    ActionButton,
  },
  setup() {
    const store = useStore();

    const signOut = () => {
      store.commit(LOGOUT_USER);
    };

    return { signOut };
  },
  data() {
    return {
      menuItems: [
        { text: "Documentation", url: "/documentation" },
        /* { text: "Jobs", url: "/jobs/results" }, */
        { text: "API Scanner", url: "/apiscanner" },
        { text: "Apis", url: "/apis" },
        { text: "My Tests", url: "/mytests" },
      ],
    };
  },

  computed: {
    /* headerHeightClass() {
      return {
        "h-16": !this.isLoggedIn,
        "h-32": this.isLoggedIn,
      };
    }, */
    ...mapState(["isLoggedIn"]),
  },
  /* methods: {
    ...mapMutations([LOGOUT_USER]),
    signOut() {
      localStorage.removeItem("accessToken");
    },
  }, */
};
</script>

<style></style>
