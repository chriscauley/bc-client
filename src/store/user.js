import { ReactiveRestApi } from '@unrest/vue-storage'

export default () => {
  const storage = ReactiveRestApi({})
  return {
    get() {
      return storage.get('user.json')
    },
  }
}
