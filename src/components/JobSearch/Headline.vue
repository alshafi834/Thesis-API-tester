<template>
  <section class="mb-16">
    <h1
      class="font-bold tracking-tighter text-8xl mb-14 mt-20"
      data-test="action-phrase"
    >
      <span :class="actionClasses">{{ action }}</span
      ><br />
      your API
    </h1>
    <h2 class="text-3xl font-light">
      API testing made easy, no code writting needed
    </h2>
  </section>
</template>

<script>
import nextElementInList from "@/utils/nextElementInList";
export default {
  name: "Headline",
  data() {
    return {
      action: "Document",
      interval: null,
    };
  },
  computed: {
    actionClasses() {
      return {
        [this.action.toLowerCase()]: true,
      };
    },
  },
  created() {
    this.changeTitle();
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    changeTitle() {
      this.interval = setInterval(() => {
        const actions = ["Document", "Display", "Test", "Integrate"];
        this.action = nextElementInList(actions, this.action);
      }, 3000);
    },
  },
};
</script>

<style scoped>
.document {
  color: #1a73eb;
}
.display {
  color: #34a853;
}
.test {
  color: #f9ab00;
}
.integrate {
  color: #d93025;
}
</style>
