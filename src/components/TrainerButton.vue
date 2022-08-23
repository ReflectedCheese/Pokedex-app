<template>
  <TrainerButton>{{ text }}</TrainerButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
button {
  background-color: #eeeeee;
  border-radius: 4px;
  font-weight: 500;
  border: none;
  padding: 4px 8px;
  color: #567868;

  &:hover {
    background-color: darken(#eeeeee, 10%);
    color: #0096e8;
    cursor: pointer;
  }
}
</style>
