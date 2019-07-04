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
import genOption from '~/utils/generate-sleep-option'

export default {
  components: { SleepRecommendationList, ReminderAndBack },
  data() {
    return {
      options: []
    }
  },
  mounted() {
    const sleepTime = new Date()
    for (let i = 6; i >= 1; i--) {
      this.options.push(genOption(i, sleepTime))
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
