<template>
  <div v-if="event">
    <table class="table -striped">
      <thead>
        <tr>
          <th>Room</th>
          <th v-for="time in times" :key="time.title">
            {{ time.title }}
            <br />
            {{ time.display }}
          </th>
          <th>Room</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.time">
          <th>{{ row.room.title }}</th>
          <td
            v-for="session in row.sessions"
            :key="session.id || session.key"
            @click="click(session)"
            :class="getClass(session)"
          >
            <b class="master-view__truncate">{{ session.title }}</b>
            {{ session.leaders }}
          </td>
          <th>{{ row.room.title }}</th>
        </tr>
        <tr />
        <tr v-for="(row, i) in orphan_rows" :key="i">
          <th />
          <td
            v-for="session in row"
            :key="session.id"
            @click="click(session)"
            :class="getClass(session)"
          >
            <b class="master-view__truncate">{{ session.title }}</b>
            {{ session.leaders }}
          </td>
          <th />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { sortBy } from 'lodash'

const getKey = ({ room, time, id }) => (room ? `${room.id}__${time.id}` : id)

export default {
  data() {
    return { selected: null, last_swapped: [] }
  },
  computed: {
    event() {
      const { loading } = this.$store.app.get()
      return !loading && this.$store.event.getCurrent()
    },
    times() {
      const { times, sessions } = this.event
      return sortBy(times, 'start')
        .map((time) => {
          const [title, display] = time.verbose.split(' @ ')
          return { title, display, id: time.id }
        })
        .filter((time) => sessions.find((s) => s.time?.id === time.id))
    },
    room_by_id() {
      const { rooms } = this.event

      const room_by_id = { null: { sessions: [] } }
      rooms.forEach((room) => {
        room_by_id[room.id] = {
          title: room.title,
          id: room.id,
        }
      })
      return room_by_id
    },
    session_by_key() {
      const { sessions } = this.event
      const out = { null: [] }

      sessions.forEach((session) => {
        session.key = getKey(session)
        if (session.room_id && session.time?.id) {
          out[getKey(session)] = session
        } else {
          out.null.push(session)
        }
      })

      return out
    },
    rows() {
      const { session_by_key, room_by_id, times } = this
      return Object.entries(room_by_id).map(([key, room]) => {
        return {
          room,
          key,
          sessions: times.map((time) => {
            const key = getKey({ room, time })
            return session_by_key[key] || { room, time, key }
          }),
        }
      })
    },
    orphan_rows() {
      const sessions = this.session_by_key.null
      const out = []
      while (sessions.length) {
        let count = this.times.length
        const row = []
        while (count-- && sessions.length) {
          row.push(sessions.shift())
        }
        out.push(row)
      }
      return out
    },
  },
  mounted() {
    document.body.classList.add('-full')
  },
  unmounted() {
    document.body.classList.remove('-full')
  },
  methods: {
    async click(session) {
      if (this.selected) {
        const serializeSession = ({ room, time, id }) => ({
          room_id: room?.id || null,
          time_id: time?.id || null,
          id,
        })
        const data = {
          session_1: serializeSession(this.selected),
          session_2: serializeSession(session),
        }
        if (session === this.selected) {
          data.session_1 = { id: null, room_id: null, time_id: null }
        }
        await this.$store.event.api.post('swap-sessions/', data)
        this.last_swapped = [this.selected, session]
        this.selected = null
      } else {
        this.selected = session
      }
    },
    getClass(session) {
      return [
        'master-view__cell',
        this.selected && getKey(this.selected) === getKey(session) && '-selected',
        this.last_swapped.includes(session) && '-last-swapped',
      ]
    },
  },
}
</script>
