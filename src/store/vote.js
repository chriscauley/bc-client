import { LocalStorage } from '@unrest/vue-storage'

export default () => {
  const storage = LocalStorage('votes')
  storage.getAllForEvent = (event_id) => {
    const query = { event_id }
    const items = storage.getPage({ per_page: 1e6 })?.items
    return items
  }
  return storage
}
