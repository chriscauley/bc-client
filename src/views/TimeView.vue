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
        :to="`/session/${session.slug}/${session.id}/`"
        v-for="session in group.sessions"
        :key="session.id"
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
      if (no_vote.length) {
        groups.push({
          text: 'None',
          sessions: no_vote,
          icon: 'ec yes-no-may-be-so-blob',
        })
      }

      return groups
    },
  },
}
</script>
