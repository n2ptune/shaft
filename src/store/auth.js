export const state = () => ({
  isLogin: null,
  user: null,
  token: null
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
  },

  getUserToken(state) {
    if (state.token) {
      return state.token
    } else {
      return null
    }
  },

  getUserAvatar(state) {
    if (state.user) {
      return state.user.avatar
    } else {
      return null
    }
  },

  getUserNickname(state) {
    if (state.user) {
      return state.user.nickname
    } else {
      return null
    }
  },

  getUserID(state) {
    if (state.user) {
      return state.user.id
    } else {
      return null
    }
  }
}

export const mutations = {
  setUser(state, { userData, token }) {
    if (userData) {
      state.user = userData
      state.isLogin = true
      state.token = token
    } else if (!userData || !token) {
      state.user = null
      state.isLogin = false
      state.token = null
    }
  }
}

export const actions = {
  setToken({ dispatch }, token) {
    localStorage.setItem('at', token)

    dispatch('getUserDataWithAccessToken', null, { root: true })
  },
  logout({ commit }) {
    localStorage.removeItem('at')
    commit('setUser', { userData: null, token: null })
    this.$router.go()
  }
}
