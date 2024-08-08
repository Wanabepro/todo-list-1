import task from "./task"

type timerOperatingFunction = (creationTime: number, currentTime: number) => void

export default interface tasklist {
  tasks: Map<number, task>
  addTask: (text: task["text"], targetTime: task["targetTime"]) => void
  deleteTask: (creationTime: number) => void
  deleteAllCompleted: () => void
  toggleCompleted: (creationTime: number) => void
  startTimer: timerOperatingFunction
  stopTimer: timerOperatingFunction
  modifyTaskText: (creationTime: number, newText: task["text"]) => void
}
