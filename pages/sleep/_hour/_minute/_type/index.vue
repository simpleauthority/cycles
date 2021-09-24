<template>
  <div class="suggestions">
    <h1>If you want to go to bed at {{ formattedSleepTime }}, you should wake up at:</h1>

    <time-recommendation-list :options="options" />

    <h2 class="reminder">
      <small>The average person falls asleep in 14 minutes. The times above assume will go to bed at {{ formattedSleepTime }} and actually fall asleep at {{ actualSleepTime }}. <router-link :to="correctedSleepPath">Click here if you'll actually <strong>fall asleep</strong> at {{ formattedSleepTime }}.</router-link></small>
    </h2>

    <back-button />
  </div>
</template>

<script>
import TimeRecommendationList from '~/components/TimeRecommendationList'
import BackButton from '~/components/BackButton'
import CycleClassMixin from '~/mixin/cycle-class-mixin'
import FormatDateMixin from '~/mixin/format-date-mixin'

export default {
  components: { TimeRecommendationList, BackButton },
  mixins: [CycleClassMixin, FormatDateMixin],
  validate ({ params }) {
    return (
      /^0[1-9]|1[0-2]$/.test(params.hour) &&
      /^0[0-9]|[1-5][0-9]$/.test(params.minute) &&
      /^(am|pm)$/i.test(params.type)
    )
  },
  data () {
    return {
      hour: null,
      minute: null,
      sleepTime: null,
      options: []
    }
  },
  computed: {
    formattedSleepTime () {
      return this.formatDate(this.sleepTime)
    },
    actualSleepTime () {
      const actual = new Date(this.sleepTime)
      actual.setMinutes(actual.getMinutes() + 14)
      return this.formatDate(actual)
    },
    correctedSleepPath () {
      const corrected = this.sleepTime
      corrected.setMinutes(corrected.getMinutes() - 14)
      return `/sleep/${this.dateToHourMinuteTypePath(corrected)}`
    }
  },
  created () {
    const type = this.$route.params.type.toLowerCase()

    let hour = parseInt(this.$route.params.hour)
    if (hour === 12 && type === 'am') {
      hour = 0
    } else if (hour !== 12 && type === 'pm') {
      hour += 12
    }

    this.hour = hour

    const minute = parseInt(this.$route.params.minute)
    this.minute = minute

    const sleepTime = new Date()
    sleepTime.setHours(hour)
    sleepTime.setMinutes(minute)
    this.sleepTime = sleepTime

    let wakeTime = new Date(sleepTime)
    wakeTime.setMinutes(wakeTime.getMinutes() + 14) // people take 14 minutes to fall asleep on average, thus the wake time is adjusted forward

    for (let i = 3; i <= 6; i++) {
      const multiplier = (i === 3 ? 270 : 90) * 60000 // time in milliseconds for a certain sleep stage i
      const result = new Date(wakeTime.getTime() + multiplier) // date representing possible wake time

      this.options.push({
        time: result,
        class: this.getClassForCycle(i),
        cycle: i
      })

      wakeTime = result
    }
  }
}
</script>

<style lang="scss">
.suggestions {
  margin-top: 30px;
  text-align: center;

  h2.reminder {
    text-align: left;
    margin-bottom: 35px;
  }
}
</style>
