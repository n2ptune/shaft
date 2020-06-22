import Vue from 'vue'

/**
 * @param {Date} date
 */
Vue.prototype.$convertDate = (date) => {
  return date
    .toJSON()
    .slice(0, 19)
    .replace('T', ' ')
}
