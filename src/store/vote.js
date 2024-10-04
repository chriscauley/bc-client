import { ReactiveRestApi } from '@unrest/vue-storage'

export default ({ store }) => {
  const storage = ReactiveRestApi({
    live_api: true, // prevents re-fetching after save
  })
  const getUrl = (event_id) => `user-event-data/${event_id}/`
  storage.getAllForEvent = (event_id) => storage.get(getUrl(event_id))
  return {
    ...storage,
    saveVote: (new_vote) => {
      const { event_id, session_id } = new_vote
      const data = storage.getAllForEvent(event_id)
      data.votes[session_id] = new_vote
      storage.put(getUrl(event_id), data)
    },
    toggleAttendance: (session) => {
      const { current_event_id } = store.app.storage.state
      const data = storage.getAllForEvent(current_event_id)
      data.attendances = data.attendances || {}
      if (data.attendances[session.time.id] === session.id) {
        delete data.attendances[session.time.id]
      } else {
        data.attendances[session.time.id] = session.id
      }
      storage.put(getUrl(current_event_id), data)
    },
  }
}
