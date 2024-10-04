<template>
  <div class="session-title">
    <div>
      <h5 class="h3">{{ session.title }}</h5>
    </div>
    <div class="session-card__details">
      with
      <b>{{ session.leaders }}</b>
      <div class="session-card__time">
        <span v-if="session.room">
          in <b>{{ session.room.title }}</b>
        </span>
        <span v-if="session.time">
          @ <b>{{ session.time.display }}</b>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    session: Object,
  },
}
</script>
