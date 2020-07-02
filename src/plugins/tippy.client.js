import Vue from 'vue'
import VueTippy from 'vue-tippy'

Vue.use(VueTippy, {
  directive: 'tippy',
  flipDuration: 0,
  popperOptions: {
    modifiers: {
      preventOverflow: {
        enabled: true
      }
    }
  }
})
