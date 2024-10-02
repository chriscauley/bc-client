<template>
  <div class="app-nav__clock" @click="show_clock = true">
    <span>{{ display_parts[0] }}</span>
    <span class="app-nav__blink">:</span>
    <span>{{ display_parts[1] }}</span>
    <span class="app-nav__blink -small" v-if="$store.app.now().live">🔴</span>
    <span class="ec ec-sleeping -small" v-else />
    <Teleport to="body">
      <unrest-modal v-if="show_clock" @close="show_clock = false" title="Select a Session">
        <div :class="getContentClass('time')">
          <div class="list-group app-nav__clock-list">
            <div class="list-group-item" @click="setTime(null)">Live! {{ live_time }}</div>
            <div
              v-for="time in times"
              :key="time.id"
              class="list-group-item"
              @click="setTime(time.valueOf)"
            >
              {{ time.verbose }}
            </div>
          </div>
        </div>
        <!-- <div :class="getContentClass('date')"> -->
        <!--   <button v-for="event in events" :key="event.id" :class="getClass(event)"> -->
        <!--     {{ event.title }} -->
        <!--   </button> -->
        <!-- </div> -->
      </unrest-modal>
    </Teleport>
  </div>
</template>

<script>
import { format } from 'date-fns'
export default {
  data() {
    return { show_clock: false, show: 'time' }
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
    events() {
      return this.$store.event.getAll()
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
    getClass(event) {
      const { current_event_id } = this.$store.event.api.state
      return ['btn', current_event_id === event.id ? '-primary' : '-secondary']
    },
    getTabClass(slug) {
      return ['nav-link', slug === this.show && '-active']
    },
    getContentClass(slug) {
      return ['tab-content', slug === this.show && '-active']
    },
  },
}
</script>
