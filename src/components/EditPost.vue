<template>
  <suspense>
    <template #default>
      <PostEditor />
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
import PostEditor from "@/components/PostEditor.vue";
import Spinner from "@/components/Spinner.vue";

export default defineComponent({
  name: "EditPost",
  components: {
    PostEditor,
    Spinner,
  },
});
</script>