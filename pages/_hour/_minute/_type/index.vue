<template>
  <div class="suggestions">
    <h1>If you want to wake up at {{ wake }}, you should be asleep at:</h1>

    <SleepRecommendationList :options="options" />
    <ReminderAndBack />
  </div>
</template>

<script>
import SleepRecommendationList from '~/components/SleepRecommendationList'
import ReminderAndBack from '~/components/ReminderAndBack'
import CycleClassMixin from '~/mixin/cycle-class-mixin'
import FormatDateMixin from '~/mixin/format-date-mixin'

export default {
  components: { SleepRecommendationList, ReminderAndBack },
  mixins: [CycleClassMixin, FormatDateMixin],
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
  created() {
    const type = this.$route.params.type.toUpperCase()
    let hour = parseInt(this.$route.params.hour)
    const minute = parseInt(this.$route.params.minute)

    if (type === 'PM') {
      hour += 12
    }

    let wake = new Date()
    wake.setHours(hour)
    wake.setMinutes(minute)

    this.wake = this.formatDate(wake)

    for (let i = 3; i <= 6; i++) {
      const multiplier = i === 3 ? 270 : 90

      const result = new Date(wake.getTime() - multiplier * 60000)
      wake = result

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
}
</style>
