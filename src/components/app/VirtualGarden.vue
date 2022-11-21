<template>
  <div class="tw-w-3/4 tw-mx-auto tw-mb-12 tw-relative tw-pt-[95px] tw-w-[480px]">
    <GardenImg class="tw-w-full"/>
    <TreeImg v-for="index in parseInt(treeCount)" :key="index" class="tw-absolute tw-w-20"
             :style="treeStyle()"/>
    <div class="tw-absolute tw-bottom-[50px] tw-w-16 tw-h-16 tw-rounded-full tw-bg-white tw-text-xl
    tw-font-bold tw-text-green-500 tw-left-[208px] tw-flex tw-justify-center tw-items-center
    tw-border-green-500 tw-border-4">
      {{userScore}}
    </div>
  </div>
</template>

<script>
import GardenImg from '@/components/app/GardenImg.vue';
import { mapState } from 'vuex';
import TreeImg from '@/components/app/TreeImg.vue';

export default {
  name: 'VirtualGarden',
  components: { TreeImg, GardenImg },
  computed: {
    ...mapState(['userScore']),
    treeCount() {
      return this.userScore < 75 ? this.userScore : 75;
    },
  },
  methods: {
    treeStyle() {
      const left = Math.floor(Math.random() * (380 - 20) + 20);
      const top = Math.floor(Math.random() * 30);
      const scale = Math.floor(Math.random() * 20) / 100;
      const greyscale = Math.floor(Math.random() * 70);
      return `left: ${left}px; top: ${top}px; z-index: ${10 + top}; transform: scale(${1 - scale}); filter: grayscale(${greyscale}%);`;
    },
  },
};
</script>

<style scoped>

</style>
