<template>
  <div class="card session-card" style="{this.state.cardStyle}">
    <div class="card-body">
      <div class="card-title">
        <h5>{{ session.title }}</h5>
      </div>
      <div class="session-card__details">
        with
        <b>{{ session.leaders }}</b>
        <span v-if="session.room">
          in <b>{{ session.room.title }}</b>
        </span>
        <span v-if="session.time">
          @ <b>{{ session.time.display }}</b>
        </span>
      </div>
      <hr />
      <p class="description">{{ session.description }}</p>
      <div class="session-card__bottom">
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
      this.$store.vote.save({
        session_id: this.session.id,
        event_id: EVENT_ID,
        attended: this.session.vote?.attended || false,
        id: this.session.vote?.id,
        value,
      })
    },
  },
}
</script>
