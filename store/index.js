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
<<<<<<< HEAD

    if (token) {
      const { data: userData } = await axios.post('/api/auth/user', null, {
        headers: {
          authorization: 'Bearer ' + token
        }
      })

      commit('auth/setUser', userData)
    }
=======
    const { data: userData } = await axios.post('/api/auth/user', null, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    commit('auth/setUser', userData)
>>>>>>> a108162530f9a0c81f07b06cb49d903813f592a9
  }
}
