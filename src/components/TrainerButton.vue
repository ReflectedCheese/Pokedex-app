<template>
  <div id="trainerButton">
    <div id="trainerButtonText">
      <div id="trainerButtonTitle">{{ title }}</div>
      <div id="trainerButtonInfo">{{ info }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TrainerButton',
  props: {
    title: {
      type: String,
      required: true,
    },

    info: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
#trainerButtonTitle {
  position: absolute;

  width: 86px;
  height: 22px;
  left: 31px;
  top: 246px;

  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;

  /* identical to box height, or 122% */
  letter-spacing: -0.408px;

  color: #ffffff;
}

#trainerButtonInfo {
  position: absolute;

  width: 84px;
  height: 22px;
  left: 31px;
  top: 268px;

  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;

  /* identical to box height, or 147% */
  letter-spacing: -0.408px;

  color: rgba(255, 255, 255, 0.5);
}
</style>
