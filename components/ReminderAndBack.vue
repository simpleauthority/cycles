<template>
  <div class="reminder-and-back">
    <h2>
      <small>Remember that the average human takes 14 minutes to fall asleep, so
        plan accordingly!</small>
    </h2>
    <b-button to="/" size="lg" pill variant="dark">
      Go Back
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'ReminderAndBack'
}
</script>

<style lang="scss">
.reminder-and-back {
  h2 {
    margin-bottom: 35px;
  }
}
</style>
