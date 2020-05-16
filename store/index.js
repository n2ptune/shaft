import axios from 'axios'

export const actions = {
  nuxtClientInit({ commit, dispatch }) {
    dispatch('getUserDataWithAccessToken')
  },
  async getUserDataWithAccessToken({ commit }) {
    const token = localStorage.getItem('at')
    const { data: userData } = await axios.post('/api/auth/user', {
      data: { token }
    })

    commit('auth/setUser', userData)
  }
}
