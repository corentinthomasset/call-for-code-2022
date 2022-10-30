<template>
  <div class="tw-w-[400px] tw-h-[600px] tw-p-5 tw-bg-slate-50 tw-overflow-auto">
    <h1 class="tw-font-grand-hotel tw-text-green-500 tw-text-5xl tw-text-center">nearbuy</h1>
    <div>
      <h2 class="tw-text-center tw-text-xl tw-text-slate-400">History</h2>
      <div class="tw-grid tw-grid-cols-1 tw-gap-4 tw-mt-4">
        <HistoryCard
          v-for="h in sortedHistory"
          :key="h.timestamp"
          :name="h.product.name"
          :cover-image="h.product.coverImage"
          :url="h.product.url"
          :results="h.results"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import HistoryCard from '@/components/popup/HistoryCard.vue';

export default {
  name: 'popupView',
  components: { HistoryCard },
  data() {
    return {
      msg: 'popup',
    };
  },

  computed: {
    ...mapState(['history']),
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
