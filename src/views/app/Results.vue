<template>
  <div class="tw-fixed tw-inset-0 tw-backdrop-blur-sm tw-bg-gray-200/80 tw-flex tw-justify-center
  tw-items-center tw-z-max tw-animate-fade-in">
    <div class="tw-rounded-xl tw-animate-slide-in tw-p-8 tw-flex tw-flex-col tw-bg-gray-50 tw-w-1/2
    tw-min-w-max">
      <div class="tw-flex tw-justify-between">
        <div>1300pts</div>
        <router-link to="/notification"><unicon name="times"/></router-link>
      </div>
      <div class="tw-flex tw-grow tw-justify-center tw-items-center tw-mt-16 tw-mb-24">
        <div>
          <h1 class="tw-text-3xl tw-text-slate-900 tw-text-center tw-font-black">
              Pre-loved {{ search.product.name }},
          </h1>
          <h2 class="tw-text-xl tw-text-slate-500 tw-text-center tw-mb-12 tw-font-light">
            looking for new owners
          </h2>
          <div class="tw-grid tw-grid-cols-3 tw-grid-row-1 tw-gap-16">
            <ResultCard
              v-for="result in topMatches"
              :key="result.url"
              :title="result.title"
              :price="result.price"
              :location="result.location"
              :cover-image="result.coverImage"
              :link="result.link"
            />
          </div>
        </div>
      </div>
      <div class="tw-flex tw-justify-center">
        <router-link to="">
          Buying local pre-loved items helps preserving our environment. <em>Learn how</em>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ResultCard from '@/components/app/ResultCard.vue';

export default {
  name: 'Results-View',
  components: { ResultCard },
  computed: {
    ...mapState(['search', 'matches', 'suggestions']),
    topMatches() {
      return this.matches.slice(0, 3);
    },
  },
};
</script>

<style scoped>

</style>
