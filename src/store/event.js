import { RestStorage } from '@unrest/vue-storage'

export const EVENT_ID = 1

export default () => {
  const storage = RestStorage('event')
  console.log(storage)
  storage.getCurrent = () => storage.getOne(EVENT_ID)
  return storage
}
