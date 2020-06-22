import Vue from 'vue'
import ConfirmComponent from '@/components/utils/Confirm'

const Confirm = Vue.extend(ConfirmComponent)
const $vm = new Confirm()

document.body.appendChild($vm.$mount().$el)

Vue.prototype.$confirm = {
  on(options) {
    Object.assign($vm, options)

    if (options.isEditor) {
      $vm.commentValue = options.body
    }

    document.body.style.overflow = 'hidden'
    $vm.isShow = true
  },
  close() {
    document.body.style.overflow = 'auto'
    $vm.commentValue = ''
    $vm.isShow = false
  }
}
