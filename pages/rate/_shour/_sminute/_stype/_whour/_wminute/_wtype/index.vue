<template>
  <div class="suggestions">
    <h1>You go to bed at <strong>{{ formattedSleepTime }}</strong> and wake up at <strong>{{ formattedWakeTime }}</strong>...</h1>

    <h2>This implies you were awake for <strong>{{ totalWakingMinutes | trimNumber }}</strong> minutes, or <strong>{{ totalWakingHours | trimNumber }}</strong> hours.</h2>

    <h2>
      After taking into account the 14 minutes it takes the average person to fall asleep, your total sleep time is <strong>{{ totalSleepDurationHours | trimNumber }}</strong> hours. This is equivalent to <strong>{{ totalSleepDurationMinutes | trimNumber }}</strong> minutes or <strong>{{ totalSleepDurationCycles | trimNumber }}</strong> sleep cycles. Optimally, you should be getting 5-6 sleep cycles every night.
    </h2>

    <h2>This is a <strong>{{ sleepQuality.text }}</strong> amount of sleep.</h2>

    <h2>Based on this rating, you might want to consider <strong>{{ recommendation }}</strong></h2>

    <b-row class="adjustments">
      <b-col cols="5">
        <h2>Adjust Bed Time</h2>
        <b-button size="lg" pill variant="dark" @click.prevent="adjustTime('sleep', 'down')">
          -
        </b-button>
        <b-button size="lg" pill variant="dark" @click.prevent="adjustTime('sleep', 'up')">
          +
        </b-button>
      </b-col>
      <b-col cols="5">
        <h2>Adjust Wake Up Time</h2>
        <b-button size="lg" pill variant="dark" @click="adjustTime('wake', 'down')">
          -
        </b-button>
        <b-button size="lg" pill variant="dark" @click.prevent="adjustTime('wake', 'up')">
          +
        </b-button>
      </b-col>
    </b-row>

    <back-button />
  </div>
</template>

<script>
import BackButton from '~/components/BackButton'
import CycleClassMixin from '~/mixin/cycle-class-mixin'
import FormatDateMixin from '~/mixin/format-date-mixin'

export default {
  components: { BackButton },
  filters: {
    trimNumber (number) {
      return (Math.round(number * 10) / 10).toFixed(1)
    }
  },
  mixins: [CycleClassMixin, FormatDateMixin],
  validate ({ params }) {
    return (
      /^0[1-9]|1[0-2]$/.test(params.whour) &&
      /^0[1-9]|1[0-2]$/.test(params.shour) &&
      /^0[0-9]|[1-5][0-9]$/.test(params.wminute) &&
      /^0[0-9]|[1-5][0-9]$/.test(params.sminute) &&
      /^(am|pm)$/i.test(params.wtype) &&
      /^(am|pm)$/i.test(params.stype)
    )
  },
  data () {
    return {
      sleepTime: null,
      wakeTime: null
    }
  },
  computed: {
    formattedSleepTime () {
      return this.formatDate(this.sleepTime)
    },
    formattedWakeTime () {
      return this.formatDate(this.wakeTime)
    },
    actualSleepTime () {
      const actualSleepTime = new Date(this.sleepTime)
      actualSleepTime.setMinutes(actualSleepTime.getMinutes() + 14) // people take 14 minutes to fall asleep on average, thus the actual time to sleep is adjusted forward
      return actualSleepTime
    },
    totalWakingMinutes () {
      const wakeMinutes = this.wakeTime.getMinutes() + (this.wakeTime.getHours() * 60)
      const sleepMinutes = this.actualSleepTime.getMinutes() + (this.actualSleepTime.getHours() * 60)

      let wakingMinutes = sleepMinutes - wakeMinutes
      if (wakingMinutes <= 0 || wakingMinutes - 14 === 0) {
        wakingMinutes = 1440 + Math.abs(wakingMinutes) // awake for over 24 hours?!!!
      }

      return wakingMinutes
    },
    totalWakingHours () {
      return this.totalWakingMinutes / 60
    },
    totalSleepDurationMinutes () {
      return Math.abs(1440 - this.totalWakingMinutes)
    },
    totalSleepDurationHours () {
      return this.totalSleepDurationMinutes / 60
    },
    totalSleepDurationCycles () {
      return this.totalSleepDurationMinutes / 90
    },
    sleepQuality () {
      const cycles = this.totalSleepDurationCycles
      if (cycles >= 0 && cycles <= 2) {
        return { text: 'bad', code: 0 }
      } else if (cycles >= 2 && cycles <= 4) {
        return { text: 'moderate', code: 1 }
      } else if (cycles > 4 && cycles < 5) {
        return { text: 'good', code: 2 }
      } else if (cycles >= 5 && cycles <= 6) {
        return { text: 'perfect', code: 3 }
      } else {
        return { text: 'superfluous', code: 4 }
      }
    },
    recommendation () {
      let recommendation = ''
      switch (this.sleepQuality.code) {
        case 0:
          recommendation = 'getting a lot more sleep. Can you wake up a bit later, or go to bed earlier?'
          break
        case 1:
          recommendation = 'getting some more sleep. Can you wake up a bit later, or go to bed earlier?'
          break
        case 2:
          recommendation = 'getting slightly more sleep. You are almost there! Can you wake up a bit later, or go to bed earlier?'
          break
        case 3:
          recommendation = 'keep doing what exactly what you\'re doing! Great job.'
          break
        case 4:
          recommendation = 'getting LESS sleep! Can you wake up a bit earlier, or go to bed later?'
          break
        default:
          recommendation = 'Try running this tool again, because apparently it broke!'
          break
      }
      return recommendation
    }
  },
  created () {
    function parseHour (hour, type) {
      if (hour === 12 && type === 'am') {
        hour = 0
      } else if (hour !== 12 && type === 'pm') {
        hour += 12
      }

      return hour
    }

    const sleepHour = parseHour(parseInt(this.$route.params.shour), this.$route.params.stype.toLowerCase())
    const sleepMinute = parseInt(this.$route.params.sminute)

    const wakeHour = parseHour(parseInt(this.$route.params.whour), this.$route.params.wtype.toLowerCase())
    const wakeMinute = parseInt(this.$route.params.wminute)

    const sleepTime = new Date()
    sleepTime.setHours(sleepHour)
    sleepTime.setMinutes(sleepMinute)

    const wakeTime = new Date()
    wakeTime.setHours(wakeHour)
    wakeTime.setMinutes(wakeMinute)

    this.sleepTime = sleepTime
    this.wakeTime = wakeTime
  },
  methods: {
    adjustTime (which, way) {
      which = which.toLowerCase()
      way = way.toLowerCase()

      const date = new Date(which === 'wake' ? this.wakeTime : this.sleepTime)

      if (way === 'up') {
        date.setHours(date.getHours() + 1)
      } else {
        date.setHours(date.getHours() - 1)
      }

      if (which === 'wake') {
        this.wakeTime = date
      } else {
        this.sleepTime = date
      }
    }
  }
}
</script>

<style lang="scss">
.suggestions {
  margin-top: 30px;
  text-align: center;

  h2 {
    text-align: left;
  }

  h1, h2 {
    margin-bottom: 35px;
  }

  .adjustments > * {
    width: 100%;
    margin: 0 auto 35px auto;
    border: 2px dashed $secondary;
    border-radius: 3px;
    padding: 1em;

    h2 {
    text-align: center;
    }
  }
}
</style>
