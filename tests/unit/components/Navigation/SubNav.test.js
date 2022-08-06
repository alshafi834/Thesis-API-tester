import { mount } from "@vue/test-utils";
import SubNav from "@/components/Navigation/SubNav.vue";

describe("SubNav", () => {
  const createConfig = (routeName) => ({
    global: {
      mocks: {
        $route: {
          name: routeName,
        },
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });
  describe("When user is on nav page", () => {
    it("Displays job count", () => {
      const routeName = "JobResults";
      const wrapper = mount(SubNav, createConfig(routeName));
      const jobCodunt = wrapper.find("[data-test='job-count']");
      expect(jobCodunt.exists()).toBe(true);
    });
  });

  describe("When user is not on job page", () => {
    it("does not display job count", () => {
      const routeName = "Home";
      const wrapper = mount(SubNav, createConfig(routeName));
      const jobCodunt = wrapper.find("[data-test='job-count']");
      expect(jobCodunt.exists()).toBe(false);
    });
  });
});
