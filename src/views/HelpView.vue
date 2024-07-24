<template>
  <div class="mx" id="help-view">
    <h3 class="red-text lighten-2">How to app?</h3>
    <div class="hr" />
    <h4 class="red-text lighten-2">Step 1: Choose Talks</h4>
    <p class="flow-text">Swipe or tap talks to sort them into the following lists.</p>
    <ul class="browser-default">
      <li v-for="vote in vote_list" class="mb" :key="vote.value">
        <span class="vote.icon" />
        {{ vote.verbose }}
      </li>
    </ul>
    <div class="hr" />
    <h4 class="red-text lighten-2">Step 2: View Schedule</h4>
    <p class="flow-text">
      Your schedule will show
      <span class="vote_list[2].icon" />
      votes at thee top of each time slot.
    </p>
    <div class="hr" />
    <h4 class="red-text lighten-2">Step 3: Attend Talks</h4>
    <p class="flow-text">
      When you attend a talk, mark your attendance in the schedule to get a
      <span class="ec ec-star" />
    </p>

    <div class="hr" />
    <p class="flow-text">
      If you want to use this app or know more, contact @badatmetroid on discord or checkout the{'
      '}
      <a href="https://github.com/chriscauley/ur-conf/">github repo</a>.
    </p>
    <div class="hr" />
    <!-- <h4 class="red-text lighten-2">Step &infin;: Control TIME!!!</h4> -->
    <!-- <p class="flow-text"> -->
    <!--   Click the clock to speed up time to 0, 5, or 15 minutes per second. -->
    <!--   Double click to reset. Use this power wisely, or you will break time. -->
    <!-- </p> -->
    <div class="hr" />
    <p class="center flow-text">What are you waiting for?</p>
    <div class="center mb">
      <router-link to="/vote/">
        <button class="btn -primary">Start Choosing Talks</button>
      </router-link>
    </div>
    <p class="flow-text" style="whitespace: pre-line" @click="next">{{ rand_text }}</p>
  </div>
</template>

<script>
import { vote_list } from '@/lib/vote'

const rand_texts = [
  'On one hand, the stars are worthless. On the other hand... shiny!',
  'Each star is worth one point. Points are great, right?',
  'Whovever has the most stars wins a prize. \nThe prize is an even bigger star.',
  "That's all. That's all this app does. What did you expect?",
  'Step 4: ...\nStep 5: ...\n...\n Profit?',
]

export default {
  data() {
    return {
      vote_list,
      rand_index: Math.floor(Math.random() * rand_texts.length),
    }
  },
  computed: {
    rand_text() {
      return rand_texts[this.rand_index]
    },
  },
  methods: {
    next() {
      let next_index = this.rand_index
      while (next_index === this.rand_index) {
        next_index = Math.floor(Math.random() * rand_texts.length)
      }
      this.rand_index = next_index
    },
  },
}
</script>

export default withAuth(Help)
