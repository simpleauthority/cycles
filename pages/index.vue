<template>
  <b-jumbotron bg-variant="dark" class="app-jumbo">
    <template slot="header">
      Cycles
    </template>
    <template slot="lead">
      Wake up at the most opportune time for your body. Feel better and take on
      anything.
    </template>
    <hr class="my-4">
    <p>
      Taking time for at least 5-6 sleep cycles per night is the best way to
      recharge your mind and body.
    </p>
    <p>
      A sleep cycle consists of approximately 90 minutes of sleep. This is where
      the 7&ndash;8 hours of sleep recommendation has its roots.
    </p>
    <p>
      The average human takes about 14 minutes to fall asleep each night. Cycles
      takes this into account with your sleep time recommendation.
    </p>
    <hr class="my-4">
    <div class="input">
      <b-button pill size="lg" to="/now">
        I'm going to sleep now, when should I wake up?
      </b-button>
      <div class="strike">
        <p>or</p>
      </div>
      <b-button v-b-modal.when-sleep-modal pill size="lg">
        I know when I want to sleep, when should I wake up?
      </b-button>
      <div class="strike">
        <p>or</p>
      </div>
      <b-button v-b-modal.when-wake-modal pill size="lg">
        I know when I want to wake up, when should I sleep?
      </b-button>
      <div class="strike">
        <p>or</p>
      </div>
      <b-button v-b-modal.rate-sleep-modal pill size="lg">
        I know the times that I sleep and wake up. Are they good, or bad?
      </b-button>
    </div>
    <when-wake-modal />
    <when-sleep-modal />
    <rate-sleep-modal />
  </b-jumbotron>
</template>

<script>
import WhenWakeModal from '~/components/modal/WhenWakeModal'
import WhenSleepModal from '~/components/modal/WhenSleepModal'
import RateSleepModal from '~/components/modal/RateSleepModal'

export default {
  components: { WhenWakeModal, WhenSleepModal, RateSleepModal }
}
</script>

<style lang="scss">
.app-jumbo {
  margin: 30px 0;

  hr {
    background-color: $tertiary;
  }

  .input {
    text-align: center;

    .strike {
      display: block;
      overflow: hidden;
      white-space: nowrap;
      margin: 30px 0;

      & > p {
        position: relative;
        display: inline-block;

        &:before,
        &:after {
          content: '';
          position: absolute;
          top: 50%;
          width: 9999px;
          height: 1px;
          background: $tertiary;
        }

        &:before {
          right: 100%;
          margin-right: 15px;
        }

        &:after {
          left: 100%;
          margin-left: 15px;
        }
      }
    }
  }
}
</style>
