<template>
<a :href="link" target="_blank" class="tw-group tw-w-56 hover:tw-no-underline">
  <div class="tw-bg-cover tw-bg-center tw-rounded-lg tw-w-56 tw-h-60 tw-shadow-lg tw-transition-all
  group-hover:-tw-translate-y-1" :style="coverStyle"></div>
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
  },
};
</script>

<style scoped>

</style>
