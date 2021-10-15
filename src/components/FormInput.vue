<template>
  <div class="field">
    <label class="label" :name="name">{{ name }}</label>
    <div class="control">
      <input
        :type="type"
        class="input"
        v-model="modelValue"
        @input="handleInput"
      />
    </div>
    <p class="is-danger help">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FormInput",
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: String,
      required: true,
    },
    error: {
      type: String,
    },
  },
  setup(props, ctx) {
    const handleInput = (e: Event) => {
      ctx.emit("update:modelValue", (e.target as HTMLInputElement).value);
    };
    return {
      handleInput,
    };
  },
});
</script>
