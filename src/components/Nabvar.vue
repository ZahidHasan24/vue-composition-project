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
    <signup />
  </teleport>
</template>
<script>
import { defineComponent } from "vue";
import { useModal } from "@/useModal";
import Signup from "@/components/Signup.vue";

export default defineComponent({
  components: {
    Signup,
  },
  setup() {
    const modal = useModal();
    const show = () => modal.showModal();
    return {
      show,
    };
  },
});
</script>
