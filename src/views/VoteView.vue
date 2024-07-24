<template>
  <div v-if="event && current_session">
    <SessionCard :session="current_session" />
  </div>
</template>

<script>
import { EVENT_ID } from '@/store/event'
import { format } from 'date-fns'

const byId = (obj) => Object.fromEntries(Object.values(obj).map((entity) => [entity.id, entity]))

export default {
  data() {
    return {
      current_id: null,
    }
  },
  computed: {
    event() {
      return this.$store.event.getCurrent()
    },
    current_session() {
      const { sessions, rooms, times } = this.event
      const session_by_id = byId(sessions)
      const room_by_id = byId(rooms)
      const time_by_id = byId(times)

      times.forEach((time) => {
        time.display = format(new Date(time.start), 'h:mm aaa')
      })

      sessions.forEach((s) => {
        s.room = room_by_id[s.room_id]
        s.time = time_by_id[s.schedule_time_id]
      })

      const votes = this.$store.vote.getAllForEvent(EVENT_ID)
      votes.forEach((v) => {
        const session = session_by_id[v.session_id] || {}
        session.vote = v
      })
      return sessions.find((s) => !s.vote)
    },
  },
}
</script>
