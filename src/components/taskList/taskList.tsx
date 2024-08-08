import useTimer from "../../hooks/useTimer"
import Task from "../task"

import "./taskList.css"

import type { filters, tasklist } from "types"

const emptyTasksMessages = {
  All: "No tasks",
  Active: "No active tasks",
  Completed: "No completed tasks",
}

const TaskList: React.FC<
  Omit<tasklist, "deleteAllCompleted" | "addTask"> & { filter: filters }
> = ({ tasks, filter, deleteTask, toggleCompleted, modifyTaskText, startTimer, stopTimer }) => {
  const currentTime = useTimer()

  const taskListEmpty = !tasks.size

  if (taskListEmpty) {
    return <div className="message">{emptyTasksMessages[filter]}</div>
  }

  return (
    <ul className="todo-list">
      {Array.from(tasks.entries()).map(([creationTime, task]) => {
        const taskAttributes = {
          ...task,
          creationTime,
          deleteTask,
          toggleCompleted,
          modifyTaskText,
          startTimer,
          stopTimer,
          currentTime,
        }

        return (
          <li key={creationTime} className={task.completed ? "completed" : ""}>
            <Task {...taskAttributes} />
          </li>
        )
      })}
    </ul>
  )
}

export default TaskList
