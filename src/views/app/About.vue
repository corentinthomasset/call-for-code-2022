<template>
  <div class="tw-overflow-y-auto">
  <div class="tw-w-4/5 tw-max-w-[900px] tw-m-auto tw-p-10">
    <div class="tw-w-1/2 tw-mx-auto tw-mb-12">
      <VirtualGarden/>
      <div class="tw-text-slate-400 tw-text-center">
        Virtual garden: {{userScore}} {{userScore > 1 ? 'seeds' : 'seed'}}
      </div>
    </div>
    <h1 class="tw-text-5xl tw-text-slate-800 tw-text-center tw-font-black tw-mb-8">
      Every click count
    </h1>
    <div class="tw-text-base tw-text-slate-500 tw-text-justify">
      <p class="tw-font-bold tw-text-slate-800 tw-text-center">
        Every click brings you closer to buying a pre-loved good instead of buying a new one.
        And it matters!</p>
      <p>
        By giving a second life to a preloved item, you contribute to preserving our environment.
        You also make your shopping more sustainable.</p>
      <ul class="tw-flex tw-justify-between tw-items-start tw-my-12">
        <li class="tw-flex tw-items-center tw-justify-center tw-flex-col tw-m-4 tw-p-4
        tw-w-1/3 tw-bg-white tw-rounded-lg tw-shadow-lg tw-text-sm tw-text-center">
          <div class="tw-w-16 tw-h-16 tw-rounded-full tw-bg-green-200 tw-flex tw-items-center
          tw-justify-center">
            <unicon name="bolt-alt" class="tw-fill-green-500"/>
          </div>
          <h4 class="tw-text-lg tw-font-bold tw-text-slate-800 tw-my-4">
            Save resources
          </h4>
          By reusing a product, you reduce waste by extending its life span and reduce the need for
          extracting resources to create extra goods. It reduces air and water pollution produced
          by manufacturing new products.
        </li>
        <li class="tw-flex tw-items-center tw-justify-center tw-flex-col tw-m-4 tw-p-4
        tw-w-1/3 tw-bg-white tw-rounded-lg tw-shadow-lg tw-text-sm tw-text-center">
          <div class="tw-w-16 tw-h-16 tw-rounded-full tw-bg-green-200 tw-flex tw-items-center
          tw-justify-center">
            <unicon name="trash-alt" class="tw-fill-green-500"/>
          </div>
          <h4 class="tw-text-lg tw-font-bold tw-text-slate-800 tw-my-4">
            Reduce waste
          </h4>
          <p>In the US, 82.2 million tons of packaging waste is produced every year.
            Approximately 36% of all plastic produced is used to create packaging,
            85% of which ends up in landfills. Non-sustainable packaging like styrofoam
            takes around 500 years to decompose.
            Reused items are packaged in their own initial box,
            or not packaged at all, which eliminates packaging waste.</p>
        </li>
        <li class="tw-flex tw-items-center tw-justify-center tw-flex-col tw-m-4 tw-p-4
        tw-w-1/3 tw-bg-white tw-rounded-lg tw-shadow-lg tw-text-sm tw-text-center">
          <div class="tw-w-16 tw-h-16 tw-rounded-full tw-bg-green-200 tw-flex tw-items-center
          tw-justify-center">
            <unicon name="truck" class="tw-fill-green-500"/>
          </div>
          <h4 class="tw-text-lg tw-font-bold tw-text-slate-800 tw-my-4">Reduce shipping</h4>
          <p>One-fifth of products bought online come from outside the buyer’s country.
            Shipping accounts for some 3% of the world’s CO2 emissions.
            In 2021, 2.6% of  8 billion tonnes of CO2 were globally emitted by shipping.
            Buying local products reduces the air pollution associated with shipping.
          </p>
        </li>
      </ul>
      <p>To thank you and celebrate the positive impact you are having on our environment,
        we plant a seed in your virtual garden for every pre-loved offer you open through nearbuy!
        The more seeds you accumulate, the more trees and flowers will flourish and you will soon
        have a nice green forest.</p>
    </div>
    <router-link to="/modal/results" class="hover:tw-no-underline">
      <button class="tw-flex tw-justify-evenly
          tw-items-center tw-p-3 tw-bg-slate-200 tw-rounded-full tw-text-medium
          tw-font-medium tw-text-slate-500 tw-mx-auto tw-mt-7 tw-w-36">
        Back to results
      </button>
    </router-link>
  </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VirtualGarden from '@/components/app/VirtualGarden.vue';

export default {
  name: 'AboutView',
  components: { VirtualGarden },
  computed: {
    ...mapState(['userScore']),
  },
  mounted() {
    this.$emit('expand');
  },
};
</script>

<style scoped>

</style>
