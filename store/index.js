import axios from 'axios'

export const actions = {
  nuxtClientInit({ dispatch }) {
    const token = localStorage.getItem('at')

    if (token) {
      dispatch('getUserDataWithAccessToken')
    }
  },
  async getUserDataWithAccessToken({ commit }) {
    const token = localStorage.getItem('at')

    if (token) {
      const { data: userData } = await axios.post('/api/auth/user', null, {
        headers: {
          authorization: 'Bearer ' + token
        }
      })

      commit('auth/setUser', userData)
    }
  }
}
