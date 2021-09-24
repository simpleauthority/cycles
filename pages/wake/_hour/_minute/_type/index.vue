<template>
  <div class="suggestions">
    <h1>If you want to wake up at {{ wakeTime }}, you should head to bed at:</h1>

    <time-recommendation-list :options="options" />

    <h2 class="reminder">
      <small>The average person falls asleep in 14 minutes. The times above assume you will be in bed at those times. The extra time to fall asleep is already accounted for.</small>
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
      wakeTime: null,
      options: []
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

    const wakeTime = new Date()
    wakeTime.setHours(hour)
    wakeTime.setMinutes(minute)

    this.wakeTime = this.formatDate(wakeTime)

    let sleepTime = new Date(wakeTime)
    sleepTime.setMinutes(sleepTime.getMinutes() - 14) // people take 14 minutes to fall asleep on average

    for (let i = 3; i <= 6; i++) {
      const multiplier = (i === 3 ? 270 : 90) * 60000 // time in milliseconds for a certain sleep stage i
      const result = new Date(sleepTime.getTime() - multiplier) // date representing possible sleep time

      this.options.push({
        time: result,
        class: this.getClassForCycle(i),
        cycle: i
      })

      sleepTime = result
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
