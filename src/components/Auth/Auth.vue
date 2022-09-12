<template>
  <div class="flex flex-col mt-28 mb-6">
    <di
      class="flex items-center flex-row w-96 m-auto mb-6 border cursor-pointer"
    >
      <h2
        class="text-center w-1/2 border-r p-2"
        :class="tab === 'Sign Up' ? 'active' : ''"
        @click="changeTab('Sign Up')"
      >
        Sign Up
      </h2>
      <h2
        class="text-center w-1/2 p-2"
        :class="tab === 'Sign In' ? 'active' : ''"
        @click="changeTab('Sign In')"
      >
        Sign In
      </h2>
    </di>
    <div class="flex flex-col w-96 m-auto">
      <input
        v-model="authCred.email"
        type="email"
        placeholder="Email"
        class="border rounded mb-4 p-2"
      />
      <input
        v-model="authCred.password"
        type="password"
        placeholder="Password"
        class="border rounded mb-4 p-2"
      />
      <action-button :text="tab" @click="signUp" />
      <p class="text-center text-green-500 p-1">{{ resMsg }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "@vue/runtime-core";
import ActionButton from "../Shared/ActionButton.vue";
import signUpUser from "@/api/signUpUser";
import { useStore } from "vuex";
import { LOGIN_USER } from "@/store/constants";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Auth",
  components: { ActionButton },
  setup() {
    const store = useStore();
    const router = useRouter();

    const tab = ref("Sign Up");
    const changeTab = (tabName) => {
      tab.value = tabName;
    };

    const authCred = ref({
      email: ref(null),
      password: ref(null),
    });

    const resMsg = ref(null);
    const signUp = async () => {
      if (tab.value === "Sign Up") {
        const response = await signUpUser(authCred.value, "up");
        resMsg.value = response.msg;
      } else {
        const response = await signUpUser(authCred.value, "in");
        localStorage.setItem("accessToken", response.accessToken);
        store.commit(LOGIN_USER);
        const tokenExpirationDate = new Date(
          new Date().getTime() + 1000 * 60 * 60
        );
        localStorage.setItem("expiration", tokenExpirationDate.toISOString());
        router.push({ name: "ApiScannerView" });
      }
    };

    return { tab, changeTab, authCred, signUp, resMsg };
  },
});
</script>

<style scoped>
.active {
  @apply font-semibold bg-gray-200;
}
</style>
