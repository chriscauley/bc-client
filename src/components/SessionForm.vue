<template>
  <unrest-modal :hide_actions="true" @close="$emit('close')">
    <p>
      Please add links to any resources that people can use to get more info about your talk (slide,
      deck, twitter, videos, etc). This is a great place to share help people who missed your talk.
    </p>
    <unrest-form
      :schema="schema"
      :state="state"
      @cancel="$emit('close')"
      @input="input"
      @submit="submit"
    />
  </unrest-modal>
</template>

<script>
export default {
  props: {
    session_id: Number,
  },
  emits: ['close'],
  data() {
    const { title, description, data } = this.$store.event
      .getCurrent()
      .sessions.find((s) => s.id === this.session_id)
    const state = { title, description }
    data.links?.forEach((l, i) => (state[`link__${i}`] = l))
    return { state, link_count: (data.links?.length || 0) + 1 }
  },
  computed: {
    schema() {
      const schema = {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string', __widget: 'textarea' },
        },
      }
      new Array(this.link_count).fill(0).forEach((_, i) => {
        schema.properties[`link__${i}`] = {
          type: 'string',
          title: `Link #${i + 1}`,
        }
      })
      return schema
    },
  },
  methods: {
    input() {
      // If there's a value in the final link, create another
      if (this.state[`link__${this.link_count - 1}`]) {
        this.link_count += 1
      }
    },
    async submit() {
      const data = { ...this.state }
      data.links = new Array(this.link_count)
        .fill(0)
        .map((_, i) => this.state[`link__${i}`])
        .filter((s) => (s || '').trim())
      await this.$store.event.api.post(`session/${this.session_id}/`, data)
      this.$store.event.api.markStale()
      this.$emit('close')
    },
  },
}
</script>
