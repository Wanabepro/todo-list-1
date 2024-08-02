import React, { useEffect, useState } from "react"

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
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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
