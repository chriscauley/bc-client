<template>
  <div :class="class_name" :style="room.style">
    <div class="room-map__name">
      {{ room.title.replace(/ /g, '') }}
    </div>
    <i v-if="[0, 1].includes(vote?.value)" :class="vote.icon" />
  </div>
</template>

<script>
export default {
  props: {
    room: Object,
  },
  computed: {
    vote() {
      return this.room.session?.vote
    },
    class_name() {
      const vote_value = this.vote?.value
      return [this.room.class_name, this.room.session && 'has-talk', vote_value === 1 && 'yes-vote']
    },
  },
}
</script>
