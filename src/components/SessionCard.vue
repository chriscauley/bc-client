<template>
  <div class="card session-card" style="{this.state.cardStyle}">
    <div class="card-body">
      <SessionTitle class="card-title" :session="session" />
      <hr />
      <p class="description">{{ session.description }}</p>
    </div>
  </div>
  <div class="app-view__btns -vote">
    <div v-for="vote in vote_list" :key="vote.value">
      <a @click="doVote(vote.value)" :class="getClass(vote)">
        <span :class="getSessionIcon(session, vote)" />
        <div>
          {{ vote.text }}
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { EVENT_ID } from '@/store/event'
import { getSessionIcon, vote_list } from '@/lib/vote'

export default {
  props: {
    session: Object,
  },
  data() {
    return { getSessionIcon, vote_list }
  },
  methods: {
    doVote(value) {
      this.$store.vote.saveVote({
        session_id: this.session.id,
        event_id: EVENT_ID,
        attended: this.session.vote?.attended || false,
        id: this.session.vote?.id,
        value,
      })
      const remaining = this.$store.app.get().sessions.filter((s) => !s.vote).length
      const { session_id } = this.$route.params
      const { vote_reminded } = this.$store.app.storage.state
      if (remaining > 5 && session_id && !vote_reminded) {
        this.$ui.toast(`${remaining} more talks to go! Click the thinky face in
 the nav if you want to enter rapid voting mode`)
        this.$store.app.storage.save({ vote_reminded: true })
      }
    },
    getClass(vote) {
      return [
        'session-card__vote-button app-view__btn btn',
        vote.value === this.session.vote?.value && '-primary',
      ]
    },
  },
}
</script>
