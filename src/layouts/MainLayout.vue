<template>
  <div class="layout-container">
    <div class="title">Pokédex</div>
    <!-- <div class="button-container">
      <Button @click="onNavigate('/myTeam')" :text="'Mijn team'" />
      <Button @click="onNavigate('/myFave')" :text="'Favorieten'" />
    </div> -->
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import TrainerButton from 'components/TrainerButton.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  // components: { TrainerButton },
  name: 'MainLayout',
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
