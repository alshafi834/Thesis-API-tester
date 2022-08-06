import { shallowMount } from "@vue/test-utils";

import ProfileImage from "@/components/Navigation/ProfileAvatar.vue";

describe("ProfileAvatar", () => {
  it("renders", () => {
    const wrapper = shallowMount(ProfileImage);
    expect(wrapper.exists()).toBe(true);
  });
});
