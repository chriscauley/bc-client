<template>
  <div v-if="!app.loading" class="vote-view">
    <SessionCard :session="current_session" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      current_id: null,
    }
  },
  computed: {
    app() {
      return this.$store.app.get()
    },
    current_session() {
      return this.app.sessions.find((s) => !s.vote)
    },
  },
}
</script>
