export const state = () => ({
  user: null
})

export const mutations = {
  setViewUser(state, userData) {
    if (!userData) {
      state.user = null
    } else {
      state.user = userData
    }
  }
}

export const getters = {
  getViewUser(state) {
    return state.user
  },

  getViewUserAvatar(state) {
    if (state.user) {
      return state.user.avatar
    }
  }
}

export const actions = {
  async fetchViewUser({ commit }, id) {
    try {
      const { data: userData } = await this.$axios.get('/api/users/' + id)
      commit('setViewUser', userData)
    } catch (error) {}
  }
}
