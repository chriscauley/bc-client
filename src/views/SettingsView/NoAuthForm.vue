<template>
  <div v-if="!submitted">
    <p>
      You are currently logged in as a guest. Please enter your emai below and you will be sent a
      login link to connect your guest account to your email. Alternately you can go to the board
      area and ask Cass to associate your email address with <b>User #{{ $store.auth.get().id }}</b>
    </p>
    <br />
    <unrest-form :schema="schema" @submit="submit" />
  </div>
  <div v-else>A confirmation email has been sent to {{ submitted }}</div>
</template>

<script>
import { getClient } from '@unrest/vue-storage'
const client = getClient()

export default {
  data() {
    return {
      submitted: undefined,
      schema: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email' },
        },
      },
    }
  },
  methods: {
    submit(form_data) {
      client.post('claim-account/', form_data).then(() => {
        this.submitted = form_data.email
      })
    },
  },
}
</script>
