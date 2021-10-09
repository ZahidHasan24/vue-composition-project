<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">New Post</div>
        <input type="text" class="input" v-model="title" />
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <div contenteditable ref="contentEditable" @input="handleInput" />
    </div>
    <div class="column">
      {{ content }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Post } from "@/data";

export default defineComponent({
  name: "PostWriter",
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  setup(props) {
    const title = ref(props.post.title);
    const content = ref("## Title\nEnter your post content...");
    const contentEditable = ref<HTMLDivElement | null>(null);

    onMounted(() => {
      if (!contentEditable.value) {
        throw Error("This should never happen");
      }
      contentEditable.value.textContent = content.value;
    });

    const handleInput = () => {
      if (!contentEditable.value) {
        throw Error("This should never happen");
      }
      content.value = contentEditable.value.textContent || "";
    };

    return {
      title,
      content,
      contentEditable,
      handleInput,
    };
  },
});
</script>
