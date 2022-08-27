<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="transparent detailPageHeader">
      <q-toolbar>
        <back-button id="Back" @click="goBack()" />
      </q-toolbar>
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
  name: 'DetailsLayout',
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
