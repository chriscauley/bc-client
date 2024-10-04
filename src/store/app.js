import { format } from 'date-fns'
import { sortBy, kebabCase } from 'lodash'

import { ReactiveLocalStorage } from '@unrest/vue-storage'

const byId = (obj) => Object.fromEntries(Object.values(obj).map((entity) => [entity.id, entity]))

// the timezones are wrong in the database for BC 2023, 2024
const fixTimezone = (time) => time.replace('Z', '')

export default ({ store }) => {
  const storage = ReactiveLocalStorage({
    LS_KEY: 'app_misc',
    initial: {
      tick: 0,
      current_time: null,
      first_visit: true,
      vote_reminded: false,
      current_event_id: 1,
    },
  })
  if (!storage.state.current_event_id) {
    storage.state.save({ current_event_id: 1 })
  }
  setInterval(() => storage.save({ tick: storage.state.tick + 1 }), 60 * 1000)
  return {
    storage,
    get() {
      const event = store.event.getCurrent() || {}
      const { rooms } = event
      let { sessions, times } = event
      const { current_event_id } = storage.state
      const { votes, attendance = {} } = store.vote.getAllForEvent(current_event_id) || {}
      if (!event.id || !votes) {
        return { loading: true }
      }
      const session_by_id = byId(sessions)
      const room_by_id = byId(rooms)
      const time_by_id = byId(times)

      times.forEach((time) => {
        time.start = fixTimezone(time.start)
        time.end = fixTimezone(time.end)
        time.display = format(new Date(time.start), 'h:mm aaa')
        time.verbose = `${time.title} @ ${time.display}`
        time.valueOf = new Date(time.start).valueOf()
      })

      sessions.forEach((s) => {
        s.room = room_by_id[s.room_id]
        s.time = time_by_id[s.schedule_time_id]
        s.slug = kebabCase(s.title)
        s.time_id = s.schedule_time_id
      })
      sessions = sortBy(sessions, (s) => s.time?.start || s.title)
      times = sortBy(times, (t) => t.start)

      Object.values(votes).forEach((v) => {
        const session = session_by_id[v.session_id] || {}
        session.vote = v
        session.attendance = attendance[session.id]
      })
      return { votes, attendance, sessions, rooms, times, loading: false }
    },
    setNow(time) {
      storage.save({ current_time: time })
    },
    now() {
      // this next line is a noop to watch the timer
      const tick = storage.state.tick; // eslint-disable-line

      const event = store.event.getCurrent() || { end: '' }
      const now = new Date().valueOf()
      const { times, sessions } = this.get()
      let current_time = storage.state.current_time || now

      // used to show attendance
      const actual_next = sortBy(times, (t) => Math.abs(now - t.valueOf))[0]

      // the timezones are wrong in the database for BC 2023, 2024
      if (current_time > new Date(fixTimezone(event.end)).valueOf()) {
        current_time = Math.min(...event.times.map((t) => new Date(fixTimezone(t.start)).valueOf()))
      }
      const next = sortBy(times, (t) => Math.abs(current_time - t.valueOf))[0]

      return {
        next,
        actual_next,
        sessions: sessions?.filter((s) => s.time === next) || [],
        display_time: format(current_time, 'h:mmaaaaa'),
        live: now === current_time,
      }
    },
  }
}
