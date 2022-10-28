<template>
    <router-view/>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'appView',
  computed: {
    ...mapState(['userScore']),
  },
  methods: {
    ...mapMutations(['setHistory', 'setTabId', 'setUserScore', 'incrementUserScore']),
  },
  mounted() {
    chrome.runtime.sendMessage({ type: 'getTabId' }, (tabId) => {
      this.setTabId(tabId);
      chrome.storage.local.get(['history', 'userScore'], ({ history, userScore }) => {
        this.setHistory(history);
        if (!userScore) {
          chrome.storage.local.set({ userScore: 1 }).catch((err) => {
            console.error(err);
          });
        } else {
          this.setUserScore(userScore);
        }
      });
      chrome.runtime.onMessage.addListener(
        (message, sender, sendResponse) => {
          if (message.type === 'incrementScore') {
            this.setUserScore(this.userScore + 1);
          }
          sendResponse(true);
        },
      );
      /*
      chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'local' && changes.history?.newValue) {
          this.setHistory(changes.history?.newValue);
        }
      });
      */
    });
  },
};
</script>

<style scoped>

</style>
