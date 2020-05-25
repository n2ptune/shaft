export default function({ store, redirect }) {
  if (!process.server) {
    if (!store.getters['auth/getIsLogin']) {
      return redirect('/auth/sign-in')
    } else {
    }
  }
}
