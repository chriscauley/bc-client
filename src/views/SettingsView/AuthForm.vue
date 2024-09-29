<template>
  <div class="flex-gap">
    <div>Email Address: {{ user.email }}</div>
    <template v-if="user_sessions">
      <p>
        You are signed up to lead the following talks. Click on one to edit the title, description,
        or info links.
      </p>
      <div class="time-group list-group">
        <div
          class="time-group__session list-group-item"
          v-for="session in user_sessions"
          :key="session.id"
          @click="editing = session.id"
        >
          <session-title :session="session" />
        </div>
      </div>
    </template>
    <div v-else>
      You are not presenting any talks. If this is incorrect, please refresh your browser.
    </div>
    <session-form v-if="editing" :session_id="editing" @close="editing = null" />
  </div>
</template>

<script>
export default {
  data() {
    return { editing: null }
  },
  computed: {
    user_sessions() {
      const { sessions } = this.$store.event.getCurrent() || {}
      return sessions?.filter((s) => s.leaders_info.find((user) => this.user.id === user.id))
    },
    user() {
      return this.$store.auth.get()
    },
  },
}
</script>
