<template>
    <div
      @click="clickHandler"
      @keyup.alt.enter="clickHandler"
      class="fixed top-16 left-0 font-sans w-screen flex justify-center items-center
      pointer-events-none z-max">
      <div class="bg-gradient-to-r from-green-500 to-green-600 px-7 py-4 text-white
      shadow-xl cursor-pointer pointer-events-auto rounded-full animate-slide-in">
        Save up to <em class="underline not-italic">${{ maxSavings }}</em> on {{ productName }}.
        Check offers near you!
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'notificationView',
  computed: {
    ...mapState(['history', 'tabId', 'matches']),
    search() {
      for (let i = this.history.length - 1; i >= 0; i -= 1) {
        if (this.history[i].tabId === this.tabId) {
          return this.history[i];
        }
      }
      return null;
    },
    productName() {
      if (this.search) {
        return this.search.product.name.toLowerCase();
      }
      return '';
    },
    maxSavings() {
      if (this.search && this.matches.length) {
        const productPrice = parseInt(this.search.product.price, 10);
        const minPrice = this.matches.reduce(
          (min, val) => Math.min(min, parseInt(val.price, 10)),
          productPrice,
        );
        return parseInt(this.search.product.price, 10) - minPrice;
      }
      return 0;
    },
  },
  methods: {
    clickHandler() {
      this.$router.push('/results');
    },
  },
};
</script>
