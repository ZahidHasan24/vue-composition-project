import { mount, flushPromises } from "@vue/test-utils";
import PostWriter from "@/components/PostWriter.vue";

const mockTitle = "My new title";
const mockContent = "## New content";

describe("PostWriter", () => {
  it("emits a save event with the new post", async (done) => {
    const wrapper = mount(PostWriter, {
      props: {
        post: {
          title: "New title",
        },
      },
    });
    const inputTitle = wrapper.find('[data-test="title"]');
    const submitBtn = wrapper.find('[data-test="submit"');
    const content = wrapper.find<HTMLDivElement>('[data-test="content"]');
    content.element.innerText = mockContent;

    await inputTitle.setValue(mockTitle);
    await content.trigger("input");

    setTimeout(async () => {
      await submitBtn.trigger("click");
      const emitted = (wrapper.emitted()["save"] as any)[0][0];
      expect(emitted.title).toBe(mockTitle);
      expect(emitted.markdown).toBe(mockContent);
      expect(emitted.html).toBe('<h2 id="new-content">New content</h2>\n');
      done();
    }, 300);
  });
});
