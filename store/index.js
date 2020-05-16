import axios from 'axios'

export const actions = {
  nuxtClientInit({ commit, dispatch }) {
    const token = localStorage.getItem('at')

    if (token) {
      dispatch('getUserDataWithAccessToken')
    }
  },
  async getUserDataWithAccessToken({ commit }) {
    const token = localStorage.getItem('at')
    const { data: userData } = await axios.post('/api/auth/user', null, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    commit('auth/setUser', userData)
  }
}
