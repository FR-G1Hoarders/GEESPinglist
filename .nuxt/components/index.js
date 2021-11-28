export const CommonAlert = () => import('../../components/common/Alert.vue' /* webpackChunkName: "components/common-alert" */).then(c => wrapFunctional(c.default || c))
export const DragonRow = () => import('../../components/dragon/DragonRow.vue' /* webpackChunkName: "components/dragon-row" */).then(c => wrapFunctional(c.default || c))
export const PinglistDatesPinglistDebugger = () => import('../../components/pinglist/DatesPinglistDebugger.vue' /* webpackChunkName: "components/pinglist-dates-pinglist-debugger" */).then(c => wrapFunctional(c.default || c))
export const PinglistGeneralPinglistDebugger = () => import('../../components/pinglist/GeneralPinglistDebugger.vue' /* webpackChunkName: "components/pinglist-general-pinglist-debugger" */).then(c => wrapFunctional(c.default || c))
export const PinglistSpecificsPinglistDebugger = () => import('../../components/pinglist/SpecificsPinglistDebugger.vue' /* webpackChunkName: "components/pinglist-specifics-pinglist-debugger" */).then(c => wrapFunctional(c.default || c))
export const DragonSelector = () => import('../../components/dragon/DragonSelector/DragonSelector.vue' /* webpackChunkName: "components/dragon-selector" */).then(c => wrapFunctional(c.default || c))
export const DragonSelectorRichText = () => import('../../components/dragon/DragonSelector/DragonSelectorRichText.vue' /* webpackChunkName: "components/dragon-selector-rich-text" */).then(c => wrapFunctional(c.default || c))
export const DragonSelectorSource = () => import('../../components/dragon/DragonSelector/DragonSelectorSource.vue' /* webpackChunkName: "components/dragon-selector-source" */).then(c => wrapFunctional(c.default || c))

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
