<template>
  <post-writer :post="newPost" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostWriter from "@/components/PostWriter.vue";
import { Post } from "@/data";
import moment from "moment";

export default defineComponent({
  name: "NewPost",
  components: {
    PostWriter,
  },
  setup() {
    const newPost: Post = {
      id: "-1",
      title: "New Post",
      created: moment(),
    };
    return {
      newPost,
    };
  },
});
</script>
