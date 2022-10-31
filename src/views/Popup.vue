<template>
  <div class="tw-w-[400px] tw-h-[600px] tw-p-5 tw-bg-slate-50 tw-overflow-auto">
    <h1 class="tw-font-grand-hotel tw-text-green-500 tw-text-5xl tw-text-center">nearbuy</h1>
    <div class="tw-bg-slate-200
    tw-px-2 tw-py-1 tw-text-sm tw-rounded-xl tw-text-slate-800 tw-mx-auto tw-w-fit">
      Montréal
    </div>
    <div>
      <div class="tw-flex tw-justify-center tw-items-center
        tw-bg-green-100 tw-px-4 tw-py-3 tw-rounded-lg tw-mt-8">
        <span class="tw-text-green-500 tw-text-lg tw-font-bold">
          Your impact: {{userScore}}
        </span>
        <SVGLeaf class="tw-fill-green-500 tw-ml-1"/>
      </div>
      <h5 class="tw-text-slate-400 tw-text-center">
        Every click brings you closer to buying a pre-loved good instead of buying a new one.
      </h5>
    </div>
    <template v-if="history.length">
      <h2 class="tw-text-center tw-text-lg tw-text-slate-400 tw-my-4">History</h2>
      <div class="tw-grid tw-grid-cols-1 tw-gap-4">
        <HistoryCard
          v-for="h in sortedHistory"
          :key="h.timestamp"
          :name="h.product.name"
          :cover-image="h.product.coverImage"
          :url="h.product.url"
          :results="h.results"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import HistoryCard from '@/components/popup/HistoryCard.vue';
import SVGLeaf from '@/components/app/Leaf.vue';

export default {
  name: 'popupView',
  components: { SVGLeaf, HistoryCard },
  data() {
    return {
      msg: 'popup',
    };
  },
  computed: {
    ...mapState(['history', 'userScore']),
    sortedHistory() {
      const history = JSON.parse(JSON.stringify(this.history));
      return history.sort((a, b) => b.timestamp - a.timestamp);
    },
  },
  methods: {
    ...mapMutations(['setHistory', 'setTabId', 'setUserScore', 'incrementUserScore']),
  },
  mounted() {
    chrome.storage.local.get(['history', 'userScore'], ({ history, userScore }) => {
      if (history) {
        this.setHistory(history);
      }
      if (!userScore) {
        chrome.storage.local.set({ userScore: 1 }).catch((err) => {
          console.error(err);
        });
      } else {
        this.setUserScore(userScore);
      }
    });
  },
};

</script>

<style>
::-webkit-scrollbar {
  height: 10px;
  width: 10px;
  background-color: rgb(248 250 252);
  -webkit-border-radius: 1ex;
}
::-webkit-scrollbar-thumb {
  background-color: rgb(209 213 219);
  -webkit-border-radius: 1ex;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgb(156 163 175);

}
::-webkit-scrollbar-corner {
  background: #000;
}
</style>
