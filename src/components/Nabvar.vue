<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons" v-if="auth">
        <router-link class="button" to="/posts/new">New Post</router-link>
        <button class="button" @click="signOut">Sign Out</button>
      </div>
      <div class="buttons" v-else>
        <button class="button" @click="signUp">Sign Up</button>
        <button class="button" @click="signIn">Sign In</button>
      </div>
    </div>
  </div>
  <teleport to="#modal">
    <component :is="component" />
  </teleport>
</template>
<script>
import { defineComponent, computed, markRaw } from "vue";
import { useModal } from "@/useModal";
import Signup from "@/components/Signup.vue";
import { useStore } from "../store";

export default defineComponent({
  components: {
    Signup,
  },
  setup() {
    const modal = useModal();
    const store = useStore();
    const auth = computed(() => {
      return !!store.getState().authors.currentUserId;
    });
    const signIn = () => {};
    const signUp = () => {
      modal.component.value = markRaw(Signup);
      modal.showModal();
    };
    const signOut = () => {};
    return {
      component: modal.component,
      auth,
      signIn,
      signUp,
      signOut,
    };
  },
});
</script>
