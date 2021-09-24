export default {
  computed: {
    timeInputs () {
      return {
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
    }
  }
}
