<template>
  <post-writer :post="newPost" @save="save" />
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
    const save = (post: Post) => {
      console.log(post);
    };
    return {
      newPost,
      save
    };
  },
});
</script>
