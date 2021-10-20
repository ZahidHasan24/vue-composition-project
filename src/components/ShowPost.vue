<template>
  <suspense>
    <template #default>
      <PostViewer />
    </template>
  </suspense>
  <suspense>
    <template #fallback>
      <Spinner />
    </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostViewer from "@/components/PostViewer.vue";
import Spinner from "@/components/Spinner.vue";

export default defineComponent({
  name: "ShowPost",
  components: {
    PostViewer,
    Spinner,
  },
});
</script>