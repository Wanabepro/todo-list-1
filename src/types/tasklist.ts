import task from "./task"

type timerOperatingFunction = (creationTime: task["creationTime"], currentTime: Date) => void

export default interface tasklist {
  tasks: task[]
  addTask: (text: task["text"], targetTime: task["targetTime"]) => void
  deleteTask: (creationTime: task["creationTime"]) => void
  deleteAllCompleted: () => void
  toggleCompleted: (creationTime: task["creationTime"]) => void
  startTimer: timerOperatingFunction
  stopTimer: timerOperatingFunction
  modifyTaskText: (creationTime: task["creationTime"], newText: task["text"]) => void
}
