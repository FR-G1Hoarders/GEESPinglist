<template>
  <div>	
    <DragonSelectorRichText v-on="$listeners" @loaded="e => this.$emit('loaded', e)" v-if="!isSourceSelectorMode" ref="dsrt" :theme="theme"></DragonSelectorRichText>
    <DragonSelectorSource @loaded="e => this.$emit('loaded', e)" v-if="isSourceSelectorMode" @swapSelectorMode="() => isSourceSelectorMode = false"></DragonSelectorSource>
  </div>
</template>

<script>
  import DragonSelectorRichText from "./DragonSelectorRichText";
  import DragonSelectorSource from "./DragonSelectorSource";
  export default {
    name: 'DragonSelector',
    components: {DragonSelectorRichText, DragonSelectorSource},
    props: {
		theme: {
			type: String,
			required: true,
		},
    },
    data() {
      return {
        isSourceSelectorMode: false,
      };
    },
  }
</script>
