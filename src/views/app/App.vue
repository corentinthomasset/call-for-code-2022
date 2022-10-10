<template>
    <router-view/>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'appView',
  methods: {
    ...mapMutations(['setHistory', 'setTabId']),
  },
  mounted() {
    chrome.runtime.sendMessage({ type: 'getTabId' }, (tabId) => {
      console.log(tabId);
      this.setTabId(tabId);
    });

    chrome.storage.local.get(['history'], ({ history }) => {
      this.setHistory(history);
    });
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && changes.history?.newValue) {
        this.setHistory(changes.history?.newValue);
      }
    });
  },
};
</script>

<style scoped>

</style>
