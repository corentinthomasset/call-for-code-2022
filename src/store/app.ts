import { createStore } from 'vuex';

export default createStore({
  state: {
    history: [],
    tabId: null,
  },
  getters: {
  },
  mutations: {
    setHistory(state, history) {
      state.history = history;
    },
    setTabId(state, tabId) {
      state.tabId = tabId;
    },
  },
  actions: {
  },
  modules: {
  },
});
