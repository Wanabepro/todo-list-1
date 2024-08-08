export default interface task {
  text: string
  timerStartingPoint: number
  pausedTimerValue: number
  targetTime: number | null
  completed: boolean
  isActive: boolean
}
