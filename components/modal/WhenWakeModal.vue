<template>
  <common-modal
    id="when-wake-modal"
    ref="modal"
    title="When do you want to wake up?"
    @ok="handleOk"
    @reset="resetModal"
  >
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
      <b-input-group>
        <b-form-select v-model="selectedHour" :options="timeInputs.hours" required />
        <b-form-select v-model="selectedMinute" :options="timeInputs.minutes" required />
        <b-form-select v-model="selectedType" :options="timeInputs.types" required />
      </b-input-group>
    </b-form>

    <template slot="ok-button">
      Tell me when to sleep!
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
      selectedHour: null,
      selectedMinute: null,
      selectedType: 'am'
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
          "Please make sure you've chosen an hour and a minute to wake up at."
        )
        return
      }

      this.$nextTick(() => {
        this.$refs.modal.hide()
        this.$router.push({
          path: `/wake/${this.selectedHour}/${this.selectedMinute}/${
            this.selectedType
          }`
        })
      })
    }
  }
}
</script>
