function convertSecondsToTimeString(time) {
  const hours = Math.floor(time / (60 * 60))
  const minutes = Math.floor((time - hours * 60 * 60) / 60)
  const seconds = time - hours * 60 * 60 - minutes * 60

  return `${hours ? `${String(hours).padStart(2, '0')}:` : ''}${String(minutes).padStart(2, '0')}:${String(
    seconds,
  ).padStart(2, '0')}`
}

export default convertSecondsToTimeString
