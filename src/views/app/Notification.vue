<template>
    <div
      v-if="showNotification"
      @click="clickHandler"
      @keyup.alt.enter="clickHandler"
      class="tw-fixed tw-top-16 tw-left-0 tw-font-sans tw-w-screen tw-flex tw-justify-center
      tw-items-center tw-pointer-events-none tw-z-max">
      <div class="tw-bg-green-500 tw-px-5 tw-py-3 tw-text-white tw-shadow-xl tw-cursor-pointer
      tw-text-white tw-pointer-events-auto tw-rounded-full
      tw-animate-slide-in tw-flex tw-items-center tw-justify-between tw-text-base">
        <span>
           Save <!-- up to <em class="tw-underline tw-not-italic"> ${{ maxSavings }} </em> -->
          on {{ productName }}.
          Check offers nearby!
        </span>
        <button class="tw-flex tw-items-center tw-pl-2"
                @click.stop="showNotification=false">
          <unicon name="times" class="tw-fill-green-700 tw-w-5 tw-h-5"/>
        </button>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'notificationView',
  data() {
    return {
      showNotification: true,
    };
  },
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
      this.$router.push('/modal/results');
    },
  },
};
</script>
