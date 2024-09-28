import { ReactiveRestApi } from '@unrest/vue-storage'

export default () => {
  const storage = ReactiveRestApi({})
  return {
    get() {
      return storage.get('user.json')
    },
    isAuthenticated() {
      const { email } = this.get() || {}
      return email && !email.endsWith('@example.com')
    },
  }
}
