<template>
    <a :href="link" target="_blank" class="hover:tw-no-underline tw-flex tw-items-center tw-px-4
    tw-justify-between">
      <div class="tw-w-12 tw-h-12 tw-rounded-lg tw-bg-cover tw-bg-center tw-shrink-0"
           :style="coverStyle"></div>
      <h3 class="tw-ml-2 tw-mr-0.5 tw-text-sm tw-font-semibold tw-whitespace-nowrap tw-truncate
      tw-max-w-[50%]">
        {{title}}
      </h3>
      <h4 class="tw-flex-auto tw-text-slate-400
      tw-whitespace-nowrap">on {{marketplaceName}}</h4>
      <h3 class="tw-ml-2 tw-text-sm tw-font-semibold">
        ${{price}}
      </h3>
    </a>
</template>

<script>
export default {
  name: 'ResultCard',
  props: {
    title: String,
    price: String,
    coverImage: String,
    link: String,
  },
  computed: {
    coverStyle() {
      return `background-image: url(${this.coverImage})`;
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
