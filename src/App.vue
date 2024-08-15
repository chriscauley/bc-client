<template>
  <div class="app-wrapper">
    <app-nav />
    <router-view class="app-view" />
    <unrest-ui />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>
