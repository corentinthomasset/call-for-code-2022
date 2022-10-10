<template>
    <div
      @click="clickHandler"
      @keyup.alt.enter="clickHandler"
      class="
      notification
      fixed
      top-16
      left-0
      font-sans
      w-screen
      flex
      justify-center
      items-center
      pointer-events-none
      z-max"
    >
      <div class="
      bg-gradient-to-r
      from-green-500
      to-green-600
      px-7
      py-4
      text-white
      shadow-xl
      cursor-pointer
      pointer-events-auto
      rounded-full
      animate-slide-in">
        Save up to <em class="underline not-italic">200$</em> on Kivik. Check offers near you!
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'notificationView',
  computed: {
    ...mapState(['history', 'tabId']),
    search() {
      for (let i = this.history.length - 1; i >= 0; i -= 1) {
        if (this.history[i].tabId === this.tabId) {
          return this.history[i].tabId;
        }
      }
      return null;
    },
  },
  methods: {
    clickHandler() {
      console.log(this.history);
    },
  },
};
</script>
