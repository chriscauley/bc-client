<template>
  <div class="MapScreen" v-if="event">
    <div :style="prepped.location.style" class="map">
      <RoomMap v-for="room in prepped.rooms" :room="room" :key="room.id" />
    </div>
  </div>
</template>

<script>
import { prepGeometry } from '@/lib/geo'

export default {
  props: {
    event: Object,
  },
  computed: {
    prepped() {
      return prepGeometry(this.event)
    },
  },
}
</script>
