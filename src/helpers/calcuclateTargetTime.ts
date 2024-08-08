const calculateTargetTime = (minutes: number, seconds: number) => {
  const duration = (minutes * 60 + seconds) * 1000

  if (duration === 0) return null

  const currentTime = new Date()

  return currentTime.getTime() + duration
}

export default calculateTargetTime
