<template>
  <div>
    <main-nav />
    <router-view />
  </div>
</template>

<script>
import MainNav from "@/components/Navigation/MainNav.vue";
import { defineComponent, onMounted } from "vue";
import { LOGIN_USER } from "@/store/constants";
import { LOGOUT_USER } from "@/store/constants";
import { useStore } from "vuex";
export default defineComponent({
  name: "App",
  components: {
    MainNav,
  },
  setup() {
    const store = useStore();
    const loginUser = onMounted(() => {
      const storedData = localStorage.getItem("accessToken");
      const expirationTime = localStorage.getItem("expiration");
      if (storedData) {
        if (new Date(expirationTime) > new Date()) {
          console.log("login");
          store.commit(LOGIN_USER);
        } else {
          console.log("logout");
          store.commit(LOGOUT_USER);
        }
      }
    });
    return { loginUser };
  },
  /* beforeMount() {
    const store = useStore();
    const storedData = JSON.parse(localStorage.getItem("accessToken"));
    if (storedData && storedData.accessToken) {
      if (storedData && storedData.accessToken) {
        store.commit(LOGIN_USER);
      }
    }
  }, */
});
</script>
