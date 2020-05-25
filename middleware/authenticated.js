export default function({ store, redirect }) {
  if (!process.server) {
    if (!store.getters['auth/getIsLogin']) {
      console.log('not authed')
      return redirect('/auth/sign-in')
    } else {
      console.log('authed')
    }
  }
}
