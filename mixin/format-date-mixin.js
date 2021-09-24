import { DateTime } from 'luxon'

export default {
  methods: {
    formatDate (date) {
      return DateTime
        .fromJSDate(date)
        .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
        .toFormat('h:mm a')
    },
    dateToHourMinuteTypePath (date) {
      let hours = date.getHours()
      const minutes = date.getMinutes()
      const type = hours >= 12 ? 'pm' : 'am'

      hours %= 12
      hours = hours || 12

      function pad (num) {
        return String(num).padStart(2, '0')
      }

      return `${pad(hours)}/${pad(minutes)}/${type}`
    }
  }
}
