import Vue from 'vue'

Vue.directive('tooltip', {
  inserted: (el, binding, vNode, oldVNode) => {
    console.dir(binding)
  }
})
