export default function({ $axios, $store }, inject) {
  const api = $axios.create()

  api.setBaseURL('http://localhost:3000')

  api.onError((error) => {
    if (error.response.status === 400) {
      console.log(401)
    }
  })

  inject('api', api)
}
