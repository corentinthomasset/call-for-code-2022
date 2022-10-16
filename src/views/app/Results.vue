<template>
  <div class="fixed inset-0 backdrop-blur-sm bg-gray-200/80 flex justify-center items-center z-max
  animate-fade-in">
    <div class="rounded-xl  animate-slide-in p-8 flex flex-col bg-gray-50 w-1/2 min-w-max">
      <div class="flex justify-between">
        <div>1300pts</div>
        <router-link to="/notification"><unicon name="times"/></router-link>
      </div>
      <div class="flex grow justify-center items-center mt-16 mb-24">
        <div>
          <h1 class="text-3xl text-slate-900 text-center font-black">
              Pre-loved {{ search.product.name }},
          </h1>
          <h2 class="text-xl text-slate-500 text-center mb-12 font-light">
            looking for new owners
          </h2>
          <div class="grid grid-cols-3 grid-row-1 gap-16">
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
      <div class="flex justify-center">
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
