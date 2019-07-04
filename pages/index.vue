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
      <b-button v-b-modal.when-modal pill size="lg">
        I know when I want to wake up, when should I sleep?
      </b-button>
    </div>

    <b-modal
      id="when-modal"
      ref="modal"
      title="When do you want to wake up?"
      header-bg-variant="dark"
      header-text-variant="light"
      header-border-variant="dark"
      body-bg-variant="dark"
      body-text-variant="light"
      footer-bg-variant="dark"
      footer-text-variant="light"
      footer-border-variant="dark"
      ok-only
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form ref="form" @submit.stop.prevent="handleSubmit">
        <b-input-group>
          <b-form-select v-model="selectedHour" :options="hours" required />
          <b-form-select v-model="selectedMinute" :options="minutes" required />
          <b-form-select v-model="selectedType" :options="types" required />
        </b-input-group>
      </b-form>

      <template slot="modal-ok">
        Tell me when to sleep!
      </template>
    </b-modal>
  </b-jumbotron>
</template>

<script>
export default {
  data() {
    return {
      selectedHour: null,
      selectedMinute: null,
      selectedType: 'am',
      hours: [
        { value: null, text: '(hour)' },
        { value: '01', text: '1' },
        { value: '02', text: '2' },
        { value: '03', text: '3' },
        { value: '04', text: '4' },
        { value: '05', text: '5' },
        { value: '06', text: '6' },
        { value: '07', text: '7' },
        { value: '08', text: '8' },
        { value: '09', text: '9' },
        { value: '10', text: '10' },
        { value: '11', text: '11' },
        { value: '12', text: '12' }
      ],
      minutes: [
        { value: null, text: '(minute)' },
        { value: '00', text: '00' },
        { value: '05', text: '05' },
        { value: '10', text: '10' },
        { value: '15', text: '15' },
        { value: '20', text: '20' },
        { value: '25', text: '25' },
        { value: '30', text: '30' },
        { value: '35', text: '35' },
        { value: '40', text: '40' },
        { value: '45', text: '45' },
        { value: '50', text: '50' },
        { value: '55', text: '55' }
      ],
      types: [{ value: 'am', text: 'AM' }, { value: 'pm', text: 'PM' }]
    }
  },
  methods: {
    resetModal() {
      this.selectedHour = null
      this.selectedMinute = null
    },
    checkForm() {
      return this.$refs.form.checkValidity()
    },
    handleOk(evt) {
      evt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit() {
      if (!this.checkForm()) {
        this.$bvModal.msgBoxOk(
          "Please make sure you've chosen an hour and a minute to wake up at."
        )
        return
      }

      this.$nextTick(() => {
        this.$refs.modal.hide()
        this.$router.push({
          path: `/${this.selectedHour}/${this.selectedMinute}/${
            this.selectedType
          }`
        })
      })
    }
  }
}
</script>

<style lang="scss">
.app-jumbo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

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
