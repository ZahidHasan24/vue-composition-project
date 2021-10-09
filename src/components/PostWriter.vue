<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">New Post</div>
        <input type="text" class="input" v-model="title" data-test="title" />
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <div
        contenteditable
        ref="contentEditable"
        @input="handleInput"
        data-test="content"
      />
    </div>
    <div class="column preview">
      <div v-html="html" />
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <button
        @click="save"
        class="button is-primary is-pulled-right"
        data-test="submit"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { Post } from "@/data";
import { parse } from "marked";
import highlight from "highlight.js";
import debounce from "lodash/debounce";

export default defineComponent({
  name: "PostWriter",
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  emits: {
    save: (post: Post) => {
      return true;
    },
  },
  setup(props, ctx) {
    const title = ref(props.post.title);
    const content = ref("## Title\nEnter your post content...");
    const html = ref("");
    const contentEditable = ref<HTMLDivElement | null>(null);

    const parseHtml = (str: string) => {
      html.value = parse(str, {
        gfm: true,
        breaks: true,
        highlight: (code: string) => {
          return highlight.highlightAuto(code).value;
        },
      });
    };

    watch(
      content,
      debounce((newVal) => {
        parseHtml(newVal);
      }, 250),
      { immediate: true }
    );

    onMounted(() => {
      if (!contentEditable.value) {
        throw Error("This should never happen");
      }
      contentEditable.value.innerText = content.value;
    });

    const handleInput = () => {
      if (!contentEditable.value) {
        throw Error("This should never happen");
      }
      content.value = contentEditable.value.innerText || "";
    };

    const save = () => {
      const newPost: Post = {
        ...props.post,
        title: title.value,
        html: html.value,
        markdown: content.value,
      };
      ctx.emit("save", newPost);
    };

    return {
      title,
      content,
      contentEditable,
      handleInput,
      html,
      save,
    };
  },
});
</script>
<style>
.preview {
  overflow-y: scroll;
}
</style>