<template>
  <unrest-modal :hide_actions="true" @close="$emit('close')">
    <p>
      Please add links to any resources that people can use to get more info (slides, socials,
      videos, articles, etc). This is a great place to share with interested people who missed your
      talk.
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
import { range } from 'lodash'

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
    data.titles?.forEach((l, i) => (state[`title__${i}`] = l))
    return { state, link_count: (data.links?.length || 0) + 1 }
  },
  computed: {
    schema() {
      const schema = {
        type: 'object',
        properties: {},
      }
      new range(this.link_count).forEach((i) => {
        schema.properties[`link__${i}`] = {
          type: 'string',
          title: `Link #${i + 1}`,
        }
        schema.properties[`title__${i}`] = {
          type: 'string',
          title: `Link title #${i + 1}`,
        }
      })
      return schema
    },
  },
  methods: {
    hasValue(i) {
      const { state } = this
      return state[`link__${i}`] || state[`title__${i}`]
    },
    input() {
      // If there's a value in the final link, create another
      if (this.hasValue(this.link_count - 1)) {
        this.link_count += 1
      } else if (!this.hasValue(this.link_count - 2)) {
        this.link_count -= 1
      }
    },
    async submit() {
      const data = { ...this.state }
      data.links = new Array(this.link_count).fill(0).map((_, i) => this.state[`link__${i}`])
      data.titles = new Array(this.link_count).fill(0).map((_, i) => this.state[`title__${i}`])
      while (!this.hasValue(data.links.length - 1) && data.links.length > 0) {
        data.links.pop()
        data.titles.pop()
      }

      await this.$store.event.api.post(`session/${this.session_id}/`, data)
      this.$store.event.api.markStale()
      this.$ui.toast.success('Talk links saved!')
      this.$emit('close')
    },
  },
}
</script>
