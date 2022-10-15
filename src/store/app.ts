import { createStore } from 'vuex';

export default createStore({
  state: {
    search: null,
    matches: [],
    suggestions: [],
    history: [],
    tabId: null,
  },
  getters: {
  },
  mutations: {
    setHistory(state, history) {
      state.history = history;
      for (let i = history.length - 1; i >= 0; i -= 1) {
        if (history[i].tabId === state.tabId) {
          state.search = history[i];
          break;
        }
      }
      if (state.search) {
        state.search.results.forEach((result) => {
          if (result.rating && result.rating > 0.1) {
            state.matches.push(result);
          } else {
            state.suggestions.push(result);
          }
        });
        state.matches.sort((a, b) => b.rating - a.rating);
        state.suggestions.sort((a, b) => b.rating - a.rating);
      }
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
