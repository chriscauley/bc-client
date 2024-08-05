<template>
  <div class="app-nav__clock" @click="show_clock = true">
    <span>{{ display_parts[0] }}</span>
    <span class="app-nav__blink">:</span>
    <span>{{ display_parts[1] }}</span>
    <Teleport to="body">
      <unrest-modal v-if="show_clock" @close="show_clock = false" title="Select a Session">
        <div class="list-group app-nav__clock-list">
          <div class="list-group-item" @click="setTime(null)">Now! {{ live_time }}</div>
          <div
            v-for="time in times"
            :key="time.id"
            class="list-group-item"
            @click="setTime(time.valueOf)"
          >
            {{ time.verbose }}
          </div>
        </div>
      </unrest-modal>
    </Teleport>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  data() {
    return { show_clock: false }
  },
  computed: {
    live_time() {
      return format(new Date().valueOf(), 'h:mm aaa')
    },
    times() {
      return this.$store.app.get().times
    },
    display_parts() {
      return this.$store.app.now().display_time.split(':')
    },
  },
  methods: {
    setTime(time) {
      this.$store.app.setNow(time)
      this.show_clock = false
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
    },
  },
}
</script>
