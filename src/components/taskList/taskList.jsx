import useTimer from "../../hooks/useTimer"
import Task from "../task"

import "./taskList.css"

const emptyTasksMessages = {
  All: "No tasks",
  Active: "No active tasks",
  Completed: "No completed tasks",
}

function TaskList({
  tasks,
  filter,
  deleteTask,
  toggleCompleted,
  modifyTaskText,
  setTaskTimerStartingPoint,
  modifyTaskPausedTimerValue,
  modifyTaskActivity,
}) {
  const currentTime = useTimer()

  const taskListEmpty = !tasks.length

  if (taskListEmpty) {
    return <div className="message">{emptyTasksMessages[filter]}</div>
  }

  return (
    <ul className="todo-list">
      {tasks.map((task) => {
        const taskAttributes = {
          ...task,
          deleteTask,
          toggleCompleted,
          modifyTaskText,
          setTaskTimerStartingPoint,
          modifyTaskPausedTimerValue,
          modifyTaskActivity,
          currentTime,
        }

        return (
          <li key={task.creationTime.getTime()} className={task.completed ? "completed" : ""}>
            <Task {...taskAttributes} />
          </li>
        )
      })}
    </ul>
  )
}

export default TaskList
