export default interface task {
  text: string
  creationTime: Date
  timerStartingPoint: Date
  pausedTimerValue: Date
  targetTime: Date | null
  completed: boolean
  isActive: boolean
}
