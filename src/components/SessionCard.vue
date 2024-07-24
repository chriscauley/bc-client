<template>
  <div class="card session-card" style="{this.state.cardStyle}">
    <div class="card-body">
      <div class="card-title">
        <h5>{{ session.title }}</h5>
      </div>
      <div class="session-card__details">
        <p>
          with
          <b>{{ session.leaders }}</b>
          <span v-if="session.room">
            in <b>{{ session.room.title }}</b>
          </span>
          <span v-if="session.time">
            @ <b>{{ session.time.display }}</b>
          </span>
        </p>
        <hr />
        <p class="description">{{ session.description }}</p>
      </div>
      <div class="session-card__actions">
        <div v-for="vote in vote_list" :key="vote.value">
          <a @click="doVote(vote.value)" class="session-card__vote-button">
            <span :class="getSessionIcon(session, vote)" />
            <div>
              {{ vote.text }}
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSessionIcon, vote_list } from '@/lib/vote'

export default {
  props: {
    session: Object,
  },
  data() {
    console.log(this.session)
    return { getSessionIcon, vote_list }
  },
  methods: {
    doVote: async function (value) {
      let new_vote = {
        session_id: this.session.id,
        event_id: this.session.event_id,
        attended: this.session.vote?.attended || false,
        id: this.session.vote?.id,
        value,
      }
      await this.$store.vote.save(new_vote)
      this.store.vote.markStale()
    },
  },
}
</script>
