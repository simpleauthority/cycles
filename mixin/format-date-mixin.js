import { DateTime } from 'luxon'

export default {
  methods: {
    formatDate(date) {
      return DateTime
        .fromJSDate(date)
        .setZone('America/Los_Angeles')
        .toFormat('h:mm a')
    }
  }
}
