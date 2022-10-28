<template>
<a :href="link" target="_blank" class="tw-group tw-w-56 hover:tw-no-underline">
  <div class="tw-bg-cover tw-bg-center tw-rounded-lg tw-w-56 tw-h-60 tw-shadow-lg tw-transition-all
  group-hover:-tw-translate-y-1 tw-relative" :style="coverStyle">
    <span v-if="marketplaceName" class="tw-absolute tw-right-2 tw-bottom-2 tw-bg-slate-900/30
    tw-px-2 tw-py-1 tw-text-xs tw-rounded-xl tw-backdrop-blur-md tw-text-white">
      {{marketplaceName}}
    </span>
  </div>
  <div class="tw-flex tw-justify-between tw-mt-4">
    <div class="tw-flex-auto tw-w-3/5 tw-mr-2">
      <h1 class="tw-text-base tw-font-semibold tw-truncate group-hover:tw-underline">
        {{ title }}
      </h1>
      <h2 class="tw-font-light tw-text-sm tw-text-slate-500 tw-truncate">{{location}}</h2>
    </div>
    <h1 class="tw-text-base tw-flex-none tw-font-semibold">
      ${{ price }}
    </h1>
  </div>
</a>
</template>

<script>
export default {
  name: 'ResultCard',
  props: {
    title: String,
    price: String,
    location: String,
    coverImage: String,
    link: String,
  },
  computed: {
    coverStyle() {
      return `background: url(${this.coverImage})`;
    },
    marketplaceName() {
      const matches = new URL(this.link).hostname.match(/^(\w*\.)*(\w+)\.\w{2,}$/);
      if (matches && matches.length >= 3) {
        return matches[2];
      }
      return null;
    },
  },
};
</script>

<style scoped>

</style>
