export const actions = {
  nuxtClientInit({ dispatch }) {
    this.$axios.interceptors.response.use((response) => {
      if (response.headers['x-www-access-token']) {
        localStorage.removeItem('at')
        localStorage.setItem('at', response.headers['x-www-access-token'])
        dispatch('getUserDataWithAccessToken')
      }
      return response
    })

    const token = localStorage.getItem('at')

    if (token) {
      dispatch('getUserDataWithAccessToken')
    }
  },
  async getUserDataWithAccessToken({ commit }) {
    const token = localStorage.getItem('at')

    if (token) {
      try {
        const { data: userData } = await this.$axios.post(
          '/api/auth/user',
          null,
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
        )

        commit('auth/setUser', { userData, token })
      } catch (error) {
        if (error.response.status === 401) {
          localStorage.removeItem('at')
        }
      }
    }
  }
}
