import { mount, flushPromises } from "@vue/test-utils";
import Timeline from "@/components/Timeline.vue";
import { today, thisWeek, thisMonth } from "@/data";
import { Store } from "@/store";

jest.mock("axios", () => ({
  get: (url: string) => {
    return Promise.resolve({
      data: [today, thisWeek, thisMonth],
    });
  },
}));

function mountTimeline() {
  const store = new Store({
    posts: {
      ids: [],
      all: new Map(),
      loaded: false,
    },
  });

  const testComp = {
    components: { Timeline },
    template: `
      <suspense>
        <template #default>
          <timeline />
        </template>
        <template #fallback>
          Loading...
        </template>
      </suspense>
    `,
  };

  return mount(testComp, {
    global: {
      plugins: [store],
    },
  });
}

describe("Timeline", () => {
  it("renders todays post", async () => {
    const wrapper = mountTimeline();
    await flushPromises();

    const todayDate = today.created.format("Do MMM");
    expect(wrapper.html()).toContain(todayDate);
  });
  it("show this week date when this week is clicked", async () => {
    const wrapper = mountTimeline();
    await flushPromises();

    const todayDate = today.created.format("Do MMM");
    const thisWeekDate = thisWeek.created.format("Do MMM");

    await wrapper.get('[data-test="This Week"]').trigger("click");

    expect(wrapper.html()).toContain(todayDate);
    expect(wrapper.html()).toContain(thisWeekDate);
  });
  it("show this month date when this week is clicked", async () => {
    const wrapper = mountTimeline();
    await flushPromises();

    const todayDate = today.created.format("Do MMM");
    const thisWeekDate = thisWeek.created.format("Do MMM");
    const thisMonthDate = thisMonth.created.format("Do MMM");

    await wrapper.get('[data-test="This Month"]').trigger("click");

    expect(wrapper.html()).toContain(todayDate);
    expect(wrapper.html()).toContain(thisWeekDate);
    expect(wrapper.html()).toContain(thisMonthDate);
  });
});
