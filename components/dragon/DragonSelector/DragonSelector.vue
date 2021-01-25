<template>
  <div>
    <a v-if="0" @click="() => isSourceSelectorMode = !isSourceSelectorMode" class="cursor-pointer float-right bg-indigo-800 text-indigo-300 px-3 py-1 rounded-tr-lg rounded-bl-lg">Swap Selector</a>
    <DragonSelectorRichText @loaded="e => this.$emit('loaded', e)" v-if="!isSourceSelectorMode"></DragonSelectorRichText>
    <DragonSelectorSource @loaded="e => this.$emit('loaded', e)" v-if="isSourceSelectorMode" @swapSelectorMode="() => isSourceSelectorMode = false"></DragonSelectorSource>
  </div>
</template>

<script>
  import {DragonSelectorRichText} from "./DragonSelectorRichText";
  import {DragonSelectorSource} from "./DragonSelectorSource";
  export default {
    name: 'DragonSelector',
    components: {DragonSelectorRichText, DragonSelectorSource},
    data() {
      return {
        isSourceSelectorMode: false,
      };
    },
  }
</script>
