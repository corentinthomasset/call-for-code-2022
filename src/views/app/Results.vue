<template>
  <div class="tw-fixed tw-inset-0 tw-backdrop-blur-sm tw-bg-gray-200/80 tw-flex tw-justify-center
  tw-items-center tw-z-max tw-animate-fade-in">
    <div ref="popup"
         class="tw-animate-slide-in tw-p-8 tw-flex tw-flex-col tw-bg-gray-50 tw-min-w-max
         tw-transition-all"
         :class="[
           {'tw-w-1/2 tw-max-h-max tw-rounded-xl tw-max-h-[715px]': !expandedView},
           {'tw-w-full tw-h-full tw-max-h-screen': expandedView}
         ]"
         :style="popUpMaxHeight">
      <div class="tw-flex tw-justify-between">
        <div>1300pts</div>
        <router-link :to="{name: 'notification'}">
          <unicon name="times"/>
        </router-link>
      </div>
      <div class="tw-flex tw-grow tw-justify-center tw-mt-16 tw-mb-24 tw-transition-all"
           :class="[
             {'tw-items-center': !expandedView},
             {'tw-items-start tw-overflow-auto': expandedView}
           ]">
        <div>
          <div class="tw-sticky tw-top-0 tw-z-10 tw-bg-gray-50">
            <h1 class="tw-text-3xl tw-text-slate-900 tw-text-center tw-font-black">
              Pre-loved {{ search.product.name }},
            </h1>
            <h2 class="tw-text-xl tw-text-slate-500 tw-text-center tw-pb-6 tw-mb-6 tw-font-light">
              looking for new owners
            </h2>
          </div>
          <div class="tw-grid tw-grid-cols-3 tw-gap-16 tw-px-3">
            <ResultCard
              v-for="result in topMatches"
              :key="result.url"
              :title="result.title"
              :price="result.price"
              :location="result.location"
              :cover-image="result.coverImage"
              :link="result.link"
            />
            <template v-if="expandedView">
              <ResultCard
                v-for="result in matches.slice(3)"
                :key="result.url"
                :title="result.title"
                :price="result.price"
                :location="result.location"
                :cover-image="result.coverImage"
                :link="result.link"
              />
            </template>
          </div>
          <button @click="expandView">Show more results</button>
        </div>
      </div>
      <div class="tw-flex tw-justify-center">
        <router-link to="">
          Buying local pre-loved items helps preserving our environment. <em>Learn how</em>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ResultCard from '@/components/app/ResultCard.vue';

export default {
  name: 'Results-View',
  components: { ResultCard },
  data() {
    return {
      expandedView: false,
      initialBodyOverflow: 'visible',
    };
  },
  computed: {
    ...mapState(['search', 'matches', 'suggestions']),
    topMatches() {
      return this.matches.slice(0, 3);
    },
  },
  methods: {
    expandView() {
      const body = document.querySelector('body');
      this.initialBodyOverflow = body.style.overflow;
      body.style.overflow = 'hidden';
      document.head.insertAdjacentHTML(
        'beforeend',
        `<style id="lof-scrollbar-style" >
                ::-webkit-scrollbar {
                    height: 10px;
                    width: 10px;
                    background: rgba(0,0,0,.05);
                    -webkit-border-radius: 1ex;
                    margin-right: 5px;
                }
                ::-webkit-scrollbar-thumb {
                    background-color: rgb(209 213 219);
                    -webkit-border-radius: 1ex;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background-color: rgb(156 163 175);

                }
                ::-webkit-scrollbar-corner {
                    background: #000;
                }
            </style>`,
      );
      this.expandedView = true;
    },
  },
  beforeUnmount() {
    const scrollbarStyle = document.querySelector('#lof-scrollbar-style');
    if (scrollbarStyle) {
      scrollbarStyle.parentNode.removeChild(scrollbarStyle);
    }
    const body = document.querySelector('body');
    body.style.overflow = this.initialBodyOverflow;
  },
};
</script>

<style scoped>

</style>
