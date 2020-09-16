export default {
  methods: {
    getClassForCycle (cycle) {
      return cycle >= 6 ? 'good' : cycle >= 4 && cycle <= 5 ? 'ok' : 'bad'
    }
  }
}
