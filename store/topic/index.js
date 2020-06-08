export const state = () => ({
  currentOffset: null,
  pageCount: null,
  topicCount: null
})

export const getters = {
  getCurrentOffset(state) {
    return state.currentOffset
  },

  getPageCount(state) {
    return state.pageCount
  },

  getTopicCount(state) {
    return state.topicCount
  }
}

export const mutations = {
  setTopicHeader(state, { currentOffset, pageCount, topicCount }) {
    state.currentOffset = currentOffset
    state.pageCount = pageCount
    state.topicCount = topicCount
  }
}
