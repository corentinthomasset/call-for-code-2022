<template>
  <div class="tw-fixed tw-inset-0 tw-backdrop-blur-sm tw-bg-gray-200/80 tw-flex tw-justify-center
  tw-items-center tw-z-max tw-animate-fade-in">
    <div ref="popup"
         class="tw-animate-slide-in tw-p-8 tw-flex tw-flex-col tw-bg-gray-50 tw-min-w-max
         tw-border-solid tw-border-2 tw-border-slate-200 tw-transition-all"
         :class="[
           {'tw-w-1/2 tw-max-h-max tw-rounded-xl tw-max-h-[650px]': !expandedView},
           {'tw-w-full tw-h-full tw-max-h-screen': expandedView}
         ]">
      <div class="tw-flex tw-justify-between">
        <router-link to="" class="tw-flex tw-justify-between tw-items-center tw-bg-green-100 tw-px-4
         tw-py-3 tw-cursor-pointer tw-rounded-full hover:tw-no-underline">
          <SVGLeaf class="tw-fill-green-500 tw-mr-2"/>
          <span class="tw-text-green-500">{{userScore}} {{userScore > 1 ? 'seeds' : 'seed'}}</span>
        </router-link>
        <router-link :to="{name: 'notification'}">
          <unicon name="times" class="tw-fill-slate-500"/>
        </router-link>
      </div>
      <div class="tw-flex tw-grow tw-justify-center tw-my-8 tw-transition-all"
           :class="[
             {'tw-items-center': !expandedView},
             {'tw-items-start tw-overflow-auto': expandedView}
           ]">
        <div>
          <div class="tw-sticky tw-top-0 tw-z-10 tw-bg-gray-50">
            <h1 class="tw-text-3xl tw-text-slate-800 tw-text-center tw-font-black">
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
              <ResultCard
                v-for="result in suggestions"
                :key="result.url"
                :title="result.title"
                :price="result.price"
                :location="result.location"
                :cover-image="result.coverImage"
                :link="result.link"
              />
            </template>
          </div>
          <button @click="expandView" v-if="!expandedView" class="tw-flex tw-justify-evenly
          tw-items-center tw-px-3 tw-py-2 tw-bg-slate-200 tw-rounded-full tw-text-medium
          tw-font-medium tw-text-slate-500 tw-mx-auto tw-mt-7 tw-w-36">
            Show more <unicon name="arrow-down" class="tw-fill-slate-500 tw-animate-bounce"/>
          </button>
        </div>
      </div>
      <div class="tw-flex tw-justify-center" v-if="expandedView">
        <router-link to="" class="tw-flex tw-justify-between tw-items-center tw-bg-green-100 tw-px-4
         tw-py-3 tw-cursor-pointer tw-rounded-full hover:tw-no-underline">
          <unicon name="trees" class="tw-fill-green-500 tw-mr-2"/>
          <span class="tw-text-green-500">
            Buying local pre-loved items helps preserving our environment.
            <em class="tw-underline tw-not-italic">Learn how</em>
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ResultCard from '@/components/app/ResultCard.vue';
import SVGLeaf from '@/components/app/Leaf.vue';

export default {
  name: 'Results-View',
  components: { SVGLeaf, ResultCard },
  data() {
    return {
      expandedView: false,
      initialBodyOverflow: 'visible',
    };
  },
  computed: {
    ...mapState(['search', 'matches', 'suggestions', 'userScore']),
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
