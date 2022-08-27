<template>
  <q-layout view="hHh lpR fFf" class="mainContainer">
    <q-header class="transparent detailPageHeader">
      <back-button id="Back" @click="goBack()" />
    </q-header>
    <router-view />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import TrainerButton from 'components/TrainerButton.vue';
import { useRouter } from 'vue-router';
import BackButton from 'src/components/BackButton.vue';

export default defineComponent({
  // components: { TrainerButton },
  name: 'FaveLayout',
  setup() {
    const router = useRouter();
    function onNavigate(path: string) {
      router.push({ path }).catch(console.error);
    }

    function goBack() {
      router.go(-1);
    }
    return {
      onNavigate,
      goBack,
    };
  },
  components: { BackButton },
});
</script>

<style scoped>
.mainContainer {
  background: linear-gradient(109.73deg, #65cb9a 0%, #15d0dc 100%);
}
</style>
