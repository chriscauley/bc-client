<template>
  <div v-if="$store.auth.get()">
    <h3 class="h3">Account Settings</h3>
    <no-auth-form v-if="!$store.auth.isAuthenticated()" />
    <auth-form v-else />
    <attended-talks />
  </div>
</template>

<script>
import NoAuthForm from './NoAuthForm.vue'
import AuthForm from './AuthForm.vue'

export default {
  components: { NoAuthForm, AuthForm },
  computed: {},
}
</script>
