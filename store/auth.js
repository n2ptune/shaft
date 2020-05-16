export const state = () => ({
  isLogin: null,
  user: null
})

export const getters = {
  getIsLogin(state) {
    return state.isLogin
  },

  getUser(state) {
    if (state.user) {
      return state.user
    } else {
      return null
    }
  }
}

export const mutations = {
  setUser(state, user) {
    if (user) {
      state.user = user
      state.isLogin = true
    }
  }
}

export const actions = {
  setToken({ dispatch }, token) {
    localStorage.setItem('at', token)

    dispatch('getUserDataWithAccessToken', null, { root: true })
  }
}
