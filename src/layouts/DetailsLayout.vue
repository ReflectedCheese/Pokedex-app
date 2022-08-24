<template>
  <div class="layout-container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import TrainerButton from 'components/TrainerButton.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  // components: { TrainerButton },
  name: 'DetailsLayout',
  setup() {
    const router = useRouter();

    function onNavigate(path: string) {
      router.push({ path }).catch(console.error);
    }

    return {
      onNavigate,
    };
  },
});
</script>
