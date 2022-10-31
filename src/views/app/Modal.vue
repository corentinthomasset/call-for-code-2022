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
      <router-view @expand="expandView"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SVGLeaf from '@/components/app/Leaf.vue';

export default {
  name: 'ModalView',
  components: { SVGLeaf },
  data() {
    return {
      expandedView: false,
      initialBodyOverflow: 'visible',
    };
  },
  computed: {
    ...mapState(['userScore']),
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
