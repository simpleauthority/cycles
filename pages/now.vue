<template>
  <div class="suggestions">
    <h1>
      If you go to bed right now, you should wake up at:
    </h1>

    <time-recommendation-list :options="options" />

    <h2 class="reminder">
      <small>The average person falls asleep in 14 minutes. The times above assume you will be in bed at those times. The extra time to fall asleep is already accounted for. Need time to get to bed? <router-link :to="`${inFiveMinutesPath}`">Click here to see wake up times five minutes from now.</router-link></small>
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
  data () {
    return {
      options: []
    }
  },
  computed: {
    current () {
      return new Date()
    },
    inFiveMinutesPath () {
      const five = this.current
      five.setMinutes(five.getMinutes() + 5)
      return `/sleep/${this.dateToHourMinuteTypePath(five)}`
    }
  },
  created () {
    let wakeTime = new Date()
    wakeTime.setMinutes(wakeTime.getMinutes() + 14) // people take 14 minutes to fall asleep on average, thus the wake time is adjusted forward

    for (let i = 1; i <= 6; i++) {
      const multiplier = (90 * i) * 60000 // time in milliseconds for a certain sleep stage i

      const result = new Date(wakeTime.getTime() + multiplier)
      wakeTime = result

      this.options.push({
        time: result,
        class: this.getClassForCycle(i),
        cycle: i
      })
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
