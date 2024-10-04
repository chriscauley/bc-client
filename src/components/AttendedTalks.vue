<template>
  <div>
    <br />
    <br />
    <h4 class="h4">Attended Talks</h4>
    <div class="time-group list-group">
      <router-link
        v-for="session in sessions"
        :key="session.id"
        :to="`/session/${session.id}/${session.slug}/`"
        class="time-group__session list-group-item"
      >
        <session-title :session="session" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { sortBy } from 'lodash'

export default {
  computed: {
    sessions() {
      const { current_event_id } = this.$store.app.storage.state
      const { attendances = {} } = this.$store.vote.getAllForEvent(current_event_id)
      const all_sessions = this.$store.event.getCurrent().sessions
      return sortBy(
        Object.values(attendances).map((id) => all_sessions.find((s) => s.id === id)),
        (s) => s.time.end,
      )
    },
  },
}
</script>
