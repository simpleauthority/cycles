export default function generateOption(cycles, wakeTime) {
  const clazz =
        cycles >= 6 ? 'good' : cycles >= 4 && cycles <= 5 ? 'ok' : 'bad'

  return {
    cycles,
    clazz,
    time: new Date(wakeTime - cycles * 104 * 60000)
  }
}
