<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <button class="button" @click="show">Sign Up</button>
        <router-link class="button" to="/posts/new">New Post</router-link>
      </div>
    </div>
  </div>
  <teleport to="#modal">
    <div>Modal</div>
  </teleport>
</template>
<script>
import { defineComponent } from "vue";
import { useModal } from "../useModal";

export default defineComponent({
  setup() {
    const modal = useModal();
    const show = () => modal.showModal();
    return {
      show,
    };
  },
});
</script>
