<template>
<a :href="link" target="_blank" class="group w-56 hover:no-underline">
  <div class="bg-cover bg-center rounded-lg w-56 h-60 shadow-lg transition-all
  group-hover:-translate-y-1" :style="coverStyle"></div>
  <div class="flex justify-between mt-4">
    <div class="flex-auto w-3/5 mr-2">
      <h1 class="font-semibold truncate group-hover:underline">{{ title }}</h1>
      <h2 class="font-light text-sm text-slate-500 truncate">{{location}}</h2>
    </div>
    <h1 class="flex-none font-semibold">
      ${{ price }}
    </h1>
    {{url}}
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
