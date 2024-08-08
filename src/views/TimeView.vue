<template>
  <div class="time-view" v-if="now.next">
    <h3 class="h3">{{ now.next.verbose }}</h3>
    <div v-for="group in groups" :key="group.text" class="time-group list-group">
      <div class="time-group__name list-group-item">
        <div class="time-group__name-inner">
          <span :class="group.icon" />
          Voted: {{ group.text }}
        </div>
      </div>
      <router-link
        v-for="session in group.sessions"
        :key="session.id"
        :to="`/session/${session.id}/${session.slug}/`"
        class="time-group__session list-group-item"
      >
        <session-title :session="session" />
      </router-link>
    </div>
  </div>
</template>
s
<script>
import { vote_list } from '@/lib/vote'

export default {
  computed: {
    now() {
      return this.$store.app.now()
    },
    groups() {
      const { sessions } = this.now
      const groups = vote_list.toReversed()
      groups.forEach((g) => (g.sessions = sessions.filter((s) => s.vote?.value === g.value)))
      const no_vote = sessions.filter((s) => !s.vote)
      groups.push({
        text: 'None',
        sessions: no_vote,
        icon: 'ec yes-no-may-be-so-blob',
      })

      return groups.filter((g) => g.sessions.length > 0)
    },
  },
  mounted() {
    // TODO this needs to be moved to the server because people can use multiple browsers
    // the first time they come to the site, redirect to the help page
    if (this.$store.app.storage.state.first_visit) {
      this.$router.replace('/help')
      this.$store.app.storage.save({ first_visit: false })
    }
  },
}
</script>
