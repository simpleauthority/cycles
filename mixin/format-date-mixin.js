import { DateTime } from 'luxon'

export default {
  methods: {
    formatDate(date) {
      return DateTime
        .fromJSDate(date)
        .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
        .toFormat('h:mm a')
    }
  }
}
