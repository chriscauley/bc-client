<template>
  <div>
    <location-map :event="event" />
  </div>
</template>

<script>
export default {
  computed: {
    event() {
      return this.$store.event.getCurrent()
    },
  },
}
</script>
