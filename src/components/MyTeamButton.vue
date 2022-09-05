<template>
  <div>
    <div class="addToMyTeam" v-if="!isMyTeam && !isFull">
      Toevoegen aan mijn team
    </div>
    <div class="removeMyTeam" v-if="isMyTeam">Verwijder van mijn team</div>
    <div class="disableMyTeam" v-if="isFull && !isMyTeam">Team is vol!</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MyTeamButton',
  props: {
    isFull: {
      type: Boolean,
      required: true,
    },
    isMyTeam: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
