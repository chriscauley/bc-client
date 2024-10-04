<template>
  <div class="app-nav">
    <router-link class="app-nav__title link" to="/">
      <img :src="favicon" />
    </router-link>
    <clock-widget />
    <div class="flex-grow" />
    <a class="btn -link" href="/map.png">
      <i class="fa fa-map-marker _icon" />
    </a>
    <router-link class="btn -link" to="/help/">
      <i class="fa fa-question-circle _icon" />
    </router-link>
    <router-link class="btn -link _icon" to="/settings/">
      <i class="fa fa-user" />
    </router-link>
    <router-link class="btn -link _icon" to="/vote/">
      <span class="ec ec-thinking" />
      <span class="pill -danger">{{ unvoted }}</span>
    </router-link>
  </div>
</template>

<script>
import favicon from '@/../public/barcamp_2024.png'
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
