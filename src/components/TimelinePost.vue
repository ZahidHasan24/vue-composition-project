<template>
  <div class="panel-block" :key="post.id">
    <div class="is-flex is-flex-direction-column is-align-items-flex-start">
      <a>{{ post.title }}</a>
      <div>{{ post.created.format("Do MMM") }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Post } from "@/data";

export default defineComponent({
  name: "TimelinePost",
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
