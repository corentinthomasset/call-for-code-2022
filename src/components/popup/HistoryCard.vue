<template>
  <div>
    <a :href="url" target="_blank" class="hover:tw-no-underline tw-bg-white tw-rounded-lg
    tw-shadow-lg tw-flex tw-items-center tw-p-1 tw-justify-between">
      <div class="tw-w-14 tw-h-14 tw-rounded-lg tw-bg-cover tw-bg-center tw-shrink-0"
           :style="coverStyle"></div>
      <h3 class="tw-ml-2 tw-mr-0.5 tw-text-sm tw-font-semibold tw-whitespace-nowrap tw-truncate
      tw-max-w-[50%]">
        {{name}}
      </h3>
      <h4 class="tw-flex-auto tw-text-slate-400
      tw-whitespace-nowrap">on {{shopName}}</h4>
      <button class="tw-flex tw-items-center tw-pl-2 tw-group"
              @click.stop.prevent="toggleResults">
        <unicon name="angle-right" class="tw-fill-slate-400 tw-w-5 tw-h-5
        group-hover:tw-fill-slate-800" :class="[{'tw-rotate-90':showResults}]"/>
      </button>
    </a>
    <div v-if="showResults" class="tw-grid tw-grid-cols-1 tw-gap-4 tw-py-4 tw-mt-2 tw-bg-gray-200/50
    tw-mx-2 tw-rounded-lg">
      <ResultCard
        v-for="result in results"
        :key="result.url"
        :title="result.title"
        :price="result.price"
        :cover-image="result.coverImage"
        :link="result.link"
      />
    </div>
  </div>
</template>

<script>
import ResultCard from '@/components/popup/ResultCard.vue';

export default {
  name: 'HistoryCard',
  components: { ResultCard },
  props: {
    name: String,
    coverImage: String,
    url: String,
    results: Object,
  },
  data() {
    return {
      showResults: false,
    };
  },
  computed: {
    coverStyle() {
      return `background-image: url(${this.coverImage})`;
    },
    shopName() {
      const matches = new URL(this.url).hostname.match(/^(\w*\.)*(\w+)\.\w{2,}$/);
      if (matches && matches.length >= 3) {
        return matches[2];
      }
      return null;
    },
  },
  methods: {
    toggleResults() {
      this.showResults = !this.showResults;
    },
  },
};
</script>

<style scoped>

</style>
