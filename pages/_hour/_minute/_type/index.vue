<template>
  <div class="suggestions">
    <h1>
      If you want to wake up at {{ wake | moment('h:mm A') }}, you should be
      asleep at:
    </h1>

    <SleepRecommendationList :options="options" />
    <ReminderAndBack />
  </div>
</template>

<script>
import SleepRecommendationList from '~/components/SleepRecommendationList'
import ReminderAndBack from '~/components/ReminderAndBack'
import genOption from '~/utils/generate-sleep-option'

export default {
  components: { SleepRecommendationList, ReminderAndBack },
  data() {
    return {
      wake: null,
      options: []
    }
  },
  validate({ params }) {
    return (
      /^0[1-9]|1[0-2]$/.test(params.hour) &&
      /^0[0-9]|[1-5][0-9]$/.test(params.minute) &&
      /^(am|pm)$/i.test(params.type)
    )
  },
  mounted() {
    const type = this.$route.params.type.toUpperCase()
    let hour = parseInt(this.$route.params.hour)
    const minute = parseInt(this.$route.params.minute)

    if (type === 'PM') {
      hour += 12
    }

    const wakeTime = new Date()
    wakeTime.setHours(hour)
    wakeTime.setMinutes(minute)

    this.wake = wakeTime

    for (let i = 6; i >= 3; i--) {
      this.options.push(genOption(i, wakeTime))
    }
  }
}
</script>

<style lang="scss">
.suggestions {
  margin-top: 30px;
  text-align: center;
}
</style>
