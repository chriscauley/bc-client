import { format } from 'date-fns'
import { EVENT_ID } from '@/store/event'

const byId = (obj) => Object.fromEntries(Object.values(obj).map((entity) => [entity.id, entity]))

export default ({ store }) => {
  return {
    get() {
      const { id: event_id, sessions, rooms, times } = store.event.getCurrent() || {}
      const votes = store.vote.getAllForEvent(EVENT_ID)
      if (!event_id) {
        return { loading: true }
      }
      const session_by_id = byId(sessions)
      const room_by_id = byId(rooms)
      const time_by_id = byId(times)

      times.forEach((time) => {
        // the timezones are wrong in the database for BC 2023
        time.start = time.start.replace('Z', '')
        time.end = time.end.replace('Z', '')
        time.display = format(new Date(time.start), 'h:mm aaa')
      })

      sessions.forEach((s) => {
        s.room = room_by_id[s.room_id]
        s.time = time_by_id[s.schedule_time_id]
      })

      votes.forEach((v) => {
        const session = session_by_id[v.session_id] || {}
        session.vote = v
      })
      return { sessions, rooms, times, loading: false }
    },
  }
}
