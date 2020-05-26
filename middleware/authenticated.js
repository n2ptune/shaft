export default function({ store, redirect }) {
  if (process.client) {
    if (!store.getters['auth/getIsLogin']) {
      return redirect('/auth/sign-in')
    }
  }
}
