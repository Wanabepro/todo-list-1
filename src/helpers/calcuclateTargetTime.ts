const calculateTargetTime = (minutes: number, seconds: number) => {
  const duration = (Number(minutes) * 60 + Number(seconds)) * 1000

  if (duration === 0) return null

  const currentTime = new Date()

  return new Date(currentTime.getTime() + duration)
}

export default calculateTargetTime
