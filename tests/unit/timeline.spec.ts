import { shallowMount } from "@vue/test-utils";
import Timeline from "@/components/Timeline.vue";
import { today, thisWeek, thisMonth } from "@/data";

describe("Timeline", () => {
  it("renders todays post", () => {
    const wrapper = shallowMount(Timeline);
    const todayDate = today.created.format("Do MMM");
    expect(wrapper.html()).toContain(todayDate);
  });
  it("show this week date when this week is clicked", async () => {
    const wrapper = shallowMount(Timeline);
    const todayDate = today.created.format("Do MMM");
    const thisWeekDate = thisWeek.created.format("Do MMM");

    await wrapper.get('[data-test="This Week"]').trigger("click");

    expect(wrapper.html()).toContain(todayDate);
    expect(wrapper.html()).toContain(thisWeekDate);
  });
  it("show this month date when this week is clicked", async () => {
    const wrapper = shallowMount(Timeline);
    const todayDate = today.created.format("Do MMM");
    const thisWeekDate = thisWeek.created.format("Do MMM");
    const thisMonthDate = thisMonth.created.format("Do MMM");

    await wrapper.get('[data-test="This Month"]').trigger("click");

    expect(wrapper.html()).toContain(todayDate);
    expect(wrapper.html()).toContain(thisWeekDate);
    expect(wrapper.html()).toContain(thisMonthDate);
  });
});
