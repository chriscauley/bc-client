<template>
  <div v-if="session">
    <session-card :session="session" />
  </div>
</template>

<script>
export default {
  computed: {
    session() {
      const id = Number(this.$route.params.session_id)
      return this.$store.app.get().sessions?.find((s) => s.id === id)
    },
  },
}
</script>
