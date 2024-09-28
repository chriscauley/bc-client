import { RestStorage } from '@unrest/vue-storage'

let interval

export default ({ store }) => {
  const storage = RestStorage('event', { collection_slug: 'event' })
  clearInterval(interval)
  interval = setInterval(() => {
    // fetch events every 30 seconds
    // TODO this should be cached somehow and maybe be faster
    storage.api.markStale()
    storage.getCurrent()
  }, 30000)
  storage.getCurrent = () => storage.getOne(store.app.storage.state.current_event_id)
  storage.getAll = () => storage.getPage({ per_Page: 1e6 })?.events
  return storage
}
