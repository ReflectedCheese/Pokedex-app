<template>
  <q-layout view="hHh lpR fFf" class="mainContainer">
    <q-header class="transparent detailPageHeader">
      <div>
        <BackButton id="Back" @click="goBack()" />
      </div>
    </q-header>
    <router-view />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import BackButton from 'src/components/BackButton.vue';

export default defineComponent({
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
