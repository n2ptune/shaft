export const actions = {
  nuxtClientInit({ dispatch }) {
    // 로컬 스토리지에서 토큰 가져오기
    const startToken = localStorage.getItem('at')

    // 클라이언트 사이드 axios baseURL localhost -> /
    this.$axios.defaults.baseURL = '/'

    // 요청 인터셉터 등록
    this.$axios.interceptors.request.use((config) => {
      // 헤더에 토큰이 담겨져 있지 않으면
      if (!config.headers.Authorization) {
        const token = localStorage.getItem('at')
        // 로컬 스토리지에 토큰이 있을 경우 (로그인을 했을 경우)
        if (token) {
          config.headers.Authorization = 'Bearer ' + token
        }
      }

      return config
    })

    // 응답 인터셉터 등록
    this.$axios.interceptors.response.use((response) => {
      // 응답에 토큰이 딸려올 경우 로컬 스토리지에 있는 토큰을 제거하고
      // 새로 응답받은 토큰으로 설정
      if (response.headers['x-www-access-token']) {
        localStorage.removeItem('at')
        localStorage.setItem('at', response.headers['x-www-access-token'])
        dispatch('getUserDataWithAccessToken')
      }
      return response
    })

    if (startToken) {
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
