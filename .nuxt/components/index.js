export { default as CommonAlert } from '../../components/common/Alert.vue'
export { default as DragonRow } from '../../components/dragon/DragonRow.vue'
export { default as PinglistDatesPinglistDebugger } from '../../components/pinglist/DatesPinglistDebugger.vue'
export { default as PinglistGeneralPinglistDebugger } from '../../components/pinglist/GeneralPinglistDebugger.vue'
export { default as PinglistSpecificsPinglistDebugger } from '../../components/pinglist/SpecificsPinglistDebugger.vue'
export { default as DragonSelector } from '../../components/dragon/DragonSelector/DragonSelector.vue'
export { default as DragonSelectorRichText } from '../../components/dragon/DragonSelector/DragonSelectorRichText.vue'
export { default as DragonSelectorSource } from '../../components/dragon/DragonSelector/DragonSelectorSource.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
