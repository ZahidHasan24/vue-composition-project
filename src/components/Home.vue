<template>
  <suspense>
    <template #default>
      <Timeline />
    </template>
    <template #fallback>
      <Spinner />
    </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Timeline from "@/components/Timeline.vue";
import Spinner from "@/components/Spinner.vue";

export default defineComponent({
  name: "Home",
  components: {
    Timeline,
    Spinner,
  },
});
</script>

