<template>
  <div class="suggestions">
    <h1>
      If you go to sleep right now, you should wake up at:
    </h1>

    <SleepRecommendationList :options="options" />
    <ReminderAndBack />
  </div>
</template>

<script>
import SleepRecommendationList from '~/components/SleepRecommendationList'
import ReminderAndBack from '~/components/ReminderAndBack'
import CycleClassMixin from '~/mixin/cycle-class-mixin'

export default {
  components: { SleepRecommendationList, ReminderAndBack },
  mixins: [CycleClassMixin],
  data () {
    return {
      options: []
    }
  },
  created () {
    let time = new Date()

    for (let i = 1; i <= 6; i++) {
      const multiplier = i === 1 ? 104 : 90

      const result = new Date(time.getTime() + multiplier * 60000)
      time = result

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
