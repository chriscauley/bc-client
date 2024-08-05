<template>
  <div class="app-nav">
    <router-link class="app-nav__title link" to="/">
      <img :src="favicon" />
    </router-link>
    <clock-widget />
    <div class="flex-grow" />
    <router-link class="btn -link" to="/help/">
      <i class="fa fa-question-circle" style="font-size: 2em; line-height: 1" />
    </router-link>
    <router-link class="btn -link" to="/settings/">
      <i class="fa fa-user" style="font-size: 2em; line-height: 1" />
    </router-link>
    <router-link class="btn -link" to="/vote/">
      <span class="ec ec-thinking" style="font-size: 2em" />
      <span class="pill -danger">{{ unvoted }}</span>
    </router-link>
  </div>
</template>

<script>
import favicon from '@/../public/favicon.ico'
import ClockWidget from './ClockWidget.vue'

export default {
  components: { ClockWidget },
  data() {
    return { favicon }
  },
  computed: {
    unvoted() {
      const { sessions = [] } = this.$store.app.get()
      return sessions.filter((s) => !s.vote).length
    },
  },
}
</script>
