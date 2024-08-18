<template>
  <div class="help-view">
    <h2 class="h2 text-center">How to app?</h2>
    <h4 class="h4">
      <span class="ec yes-no-may-be-so-blob" />
      Step 1: Choose Talks
    </h4>
    <p class="flow-text">Vote on each talk to sort them into the following lists.</p>
    <ul class="browser-default">
      <div class="help-view__vote" v-for="vote in vote_list" :key="vote.value">
        <span :class="vote.icon" />
        {{ vote.verbose }}
      </div>
    </ul>
    <div class="hr" />
    <h4 class="h4">
      <span class="ec party-blob" />
      Step 2: View Schedule
    </h4>
    <p class="flow-text">
      Your schedule will show
      <span :class="vote_list[0].icon" />
      votes at thee top of each time slot.
    </p>
    <div class="hr" />
    <h4 class="h4">
      <span class="ec party-blob-2" />
      Step 3: Attend Talks
    </h4>
    <p class="flow-text">
      When you attend a talk, mark your attendance in the schedule to get a
      <span class="ec ec-star" />
    </p>

    <div class="hr" />
    <p class="flow-text">
      If you want to use this app or know more, contact @badatmetroid on discord or checkout the
      github repos for the
      <a href="https://github.com/chriscauley/bc-client/">front end</a> or
      <a href="https://github.com/FlipperPA/unconference/">back end</a>
    </p>
    <!-- <h4 class="h4">Step &infin;: Control TIME!!!</h4> -->
    <!-- <p class="flow-text"> -->
    <!--   Click the clock to speed up time to 0, 5, or 15 minutes per second. -->
    <!--   Double click to reset. Use this power wisely, or you will break time. -->
    <!-- </p> -->
    <!-- <div class="hr" /> -->
    <div class="help-view__actions text-center">
      <p>What are you waiting for?</p>
      <router-link to="/vote/" class="help-view__action">
        <span class="ec ec-thinking" />
        <button class="btn -primary">Start Choosing Talks</button>
      </router-link>
      <div>
        <b> - OR - </b>
      </div>
      <router-link to="/" class="help-view__action">
        <span class="ec conference-logo" />
        <button class="btn -primary">See Current Schedule</button>
      </router-link>
    </div>
    <div class="hr" />
    <div class="hr" />
    <p class="help-view__random-text" @click="next">{{ rand_text }}</p>
  </div>
</template>

<script>
import { vote_list } from '@/lib/vote'

const rand_texts = [
  'On one hand, the stars are worthless.\nOn the other hand... shiny!',
  'Each star is worth one point.\nPoints are great, right?',
  'Whovever has the most stars wins a prize. \nThe prize is an even bigger star.',
  "That's all. That's all this app does.\nWhat did you expect?",
  'Step 4: ...\nStep 5: ...\n...\n...\n...\n Profit?',
  "There are way too many easter eggs on this site.\nI'm sorry. I get bored easily.",
]

export default {
  data() {
    return {
      vote_list: vote_list.toReversed(),
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
