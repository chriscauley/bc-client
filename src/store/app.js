import { format } from 'date-fns'
import { EVENT_ID } from '@/store/event'
import { sortBy, kebabCase } from 'lodash'

import { ReactiveLocalStorage } from '@unrest/vue-storage'

const byId = (obj) => Object.fromEntries(Object.values(obj).map((entity) => [entity.id, entity]))

export default ({ store }) => {
  const storage = ReactiveLocalStorage({
    initial: {
      tick: 0,
      current_time: null,
      first_visit: true,
    },
  })
  setInterval(() => storage.save({ tick: storage.state.tick + 1 }), 60 * 1000)
  return {
    storage,
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
        time.verbose = `${time.title} @ ${time.display}`
        time.valueOf = new Date(time.start).valueOf()
      })

      sessions.forEach((s) => {
        s.room = room_by_id[s.room_id]
        s.time = time_by_id[s.schedule_time_id]
        s.slug = kebabCase(s.title)
      })
      let sorted_sessions = sortBy(sessions, (s) => s.time.start)

      votes.forEach((v) => {
        const session = session_by_id[v.session_id] || {}
        session.vote = v
      })
      return { sessions: sorted_sessions, rooms, times, loading: false }
    },
    setNow(time) {
      storage.save({ current_time: time })
    },
    now() {
      // this next line is a noop to watch the timer
      const tick = storage.state.tick; // eslint-disable-line
      const now = new Date().valueOf()
      const { times, sessions } = this.get()
      const current_time = storage.state.current_time || now
      let next = sortBy(times, (t) => Math.abs(current_time - t.valueOf))[0]
      return {
        next,
        sessions: sessions?.filter((s) => s.time === next) || [],
        display_time: format(current_time, 'h:mmaaaaa'),
        live: now === current_time,
      }
    },
  }
}
