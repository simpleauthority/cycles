<template>
  <common-modal
    id="rate-sleep-modal"
    ref="modal"
    title="When do you wake up and go to sleep?"
    @ok="handleOk"
    @reset="resetModal"
  >
    <b-form ref="form" class="form" @submit.stop.prevent="handleSubmit">
      <div>
        <h4>When do you sleep?</h4>
        <b-input-group>
          <b-form-select v-model="selectedSleepHour" :options="timeInputs.hours" required />
          <b-form-select v-model="selectedSleepMinute" :options="timeInputs.minutes" required />
          <b-form-select v-model="selectedSleepType" :options="timeInputs.types" required />
        </b-input-group>
      </div>
      <div>
        <h4>When do you wake up?</h4>
        <b-input-group>
          <b-form-select v-model="selectedWakeHour" :options="timeInputs.hours" required />
          <b-form-select v-model="selectedWakeMinute" :options="timeInputs.minutes" required />
          <b-form-select v-model="selectedWakeType" :options="timeInputs.types" required />
        </b-input-group>
      </div>
    </b-form>

    <template slot="ok-button">
      Rate my sleep!
    </template>
  </common-modal>
</template>

<script>
import CommonModal from './CommonModal.vue'
import InputMixin from '~/mixin/input-mixin'

export default {
  components: { CommonModal },
  mixins: [InputMixin],
  data () {
    return {
      selectedWakeHour: null,
      selectedWakeMinute: null,
      selectedWakeType: 'am',
      selectedSleepHour: null,
      selectedSleepMinute: null,
      selectedSleepType: 'pm'
    }
  },
  methods: {
    resetModal () {
      this.selectedHour = null
      this.selectedMinute = null
    },
    checkForm () {
      return this.$refs.form.checkValidity()
    },
    handleOk (evt) {
      evt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit () {
      if (!this.checkForm()) {
        this.$bvModal.msgBoxOk(
          "Please make sure you've chosen an hour and a minute to go to sleep at."
        )
        return
      }

      this.$nextTick(() => {
        this.$refs.modal.hide()
        this.$router.push({
          path: `/rate/${this.selectedWakeHour}/${this.selectedWakeMinute}/${this.selectedWakeType}/${this.selectedSleepHour}/${this.selectedSleepMinute}/${this.selectedSleepType}`
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  div {
    margin-bottom: 35px;
  }
}
</style>
