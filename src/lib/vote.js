// import { cloneDeep, shuffle, sortBy } from 'lodash'

export const vote_list = [
  {
    text: 'no',
    verbose: 'No Thanks',
    value: -1,
    icon: 'ec ec-see-no-evil',
    class: 'red',
  },
  {
    verbose: 'Maybe',
    text: 'maybe',
    value: 0,
    icon: 'ec ec-thinking',
    class: 'yellow',
  },
  {
    verbose: "Yes, I'm interested",
    text: 'yes',
    value: 1,
    icon: 'ec ec-heart-eyes',
    class: 'green',
  },
]

export const vote_map = {}

vote_list.forEach((vote) => (vote_map[vote.value] = vote))

// export const setVote = (talk, vote) => {
//   talk.vote = vote_map[vote] ? { ...vote_map[vote] } : undefined
// }

// export const setAttendance = (talk, timeslot) => {
//   const _attendance = talk.attendance
//   timeslot.talkSet.forEach(t => (t.attendance = false))
//   talk.attendance = !_attendance
// }

export const getSessionIcon = (session, vote) => [
  vote.icon,
  'vote',
  session.vote && vote.value === session.vote.value && 'selected',
]

// export const prepTalkVotes = (component, resort) => {
//   // fold existing votes into the talk data
//   // this needs to be called everytime a component is mounted
//   // the cloned component.timeslots prevents the TalkList from re-prepping every render
//   const { talkGQL, auth } = component.props
//   if (component.timeslots || talkGQL.loading || auth.loading) {
//     return
//   }

//   const voteMap = {}
//   const sorter = talk => {
//     if (!talk.vote) {
//       return -5
//     }
//     return -talk.vote.value
//   }
//   auth.talkvotes.map(({ talkId, vote }) => (voteMap[talkId] = vote))

//   const attendances = {}
//   auth.talkattendances.forEach(({ talkId }) => (attendances[talkId] = true))

//   const timeslots = cloneDeep(talkGQL.conference.timeslotSet)
//   let lastslot
//   timeslots.forEach(timeslot => {
//     timeslot.DATE = new Date(timeslot.datetime).valueOf()
//     if (lastslot) {
//       lastslot.END_DATE = timeslot.DATE - 15 * 60 * 1000
//       lastslot.nextSlotId = timeslot.id
//     }
//     lastslot = timeslot
//     timeslot.talkSet.map(talk => {
//       setVote(talk, voteMap[talk.id])
//       talk.timeslot = timeslot
//       talk.attendance = attendances[talk.id]
//     })
//     if (resort) {
//       timeslot.talkSet = sortBy(shuffle(timeslot.talkSet), sorter)
//     }
//   })
//   lastslot.END_DATE = lastslot.DATE + 45 * 60 * 1000
//   component.timeslots = timeslots
// }
