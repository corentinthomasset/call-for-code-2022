<template>
    <div
      @click="clickHandler"
      @keyup.alt.enter="clickHandler"
      class="tw-fixed tw-top-16 tw-left-0 tw-font-sans tw-w-screen tw-flex tw-justify-center
      tw-items-center tw-pointer-events-none tw-z-max">
      <div class="tw-bg-gradient-to-r tw-from-green-500 tw-to-green-600 tw-px-7 tw-py-4
      tw-text-white tw-shadow-xl tw-cursor-pointer tw-pointer-events-auto tw-rounded-full
      tw-animate-slide-in">
        Save up to
        <em class="tw-underline tw-not-italic">${{ maxSavings }}</em>
        on {{ productName }}.
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
