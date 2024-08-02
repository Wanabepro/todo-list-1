import { useState } from "react"

import useLocalStorage from "./useLoacalStorage"

const useTaskList = () => {
  const [tasks, setTasks] = useState([])

  useLocalStorage(tasks, setTasks)

  const addTask = (text) => {
    const newTask = {
      text,
      creationTime: new Date(),
      timerStartingPoint: new Date(),
      pausedTimerValue: new Date(0),
      completed: false,
      isActive: true,
    }

    setTasks((tasks) => [newTask, ...tasks])
  }

  const deleteTask = (creationTime) => {
    setTasks((tasks) => tasks.filter((task) => task.creationTime !== creationTime))
  }

  const toggleCompleted = (creationTime) => {
    setTasks((tasks) => {
      const targetIndex = tasks.findIndex((task) => task.creationTime === creationTime)
      const targetTask = tasks[targetIndex]
      return [
        ...tasks.slice(0, targetIndex),
        { ...targetTask, completed: !targetTask.completed },
        ...tasks.slice(targetIndex + 1),
      ]
    })
  }

  const deleteAllCompleted = () => {
    setTasks((tasks) => tasks.filter((task) => !task.completed))
  }

  const modifyTaskText = (creationTime, newText) => {
    setTasks((tasks) => {
      const targetIndex = tasks.findIndex((el) => el.creationTime === creationTime)
      const targetTask = tasks[targetIndex]
      const newTask = {
        ...targetTask,
        text: newText,
      }

      return [...tasks.slice(0, targetIndex), newTask, ...tasks.slice(targetIndex + 1)]
    })
  }

  const setTaskTimerStartingPoint = (creationTime, newStartingPoint) => {
    setTasks((tasks) => {
      const targetIndex = tasks.findIndex((el) => el.creationTime === creationTime)
      const targetTask = tasks[targetIndex]
      const newTask = {
        ...targetTask,
        timerStartingPoint: newStartingPoint,
      }

      return [...tasks.slice(0, targetIndex), newTask, ...tasks.slice(targetIndex + 1)]
    })
  }

  const modifyTaskActivity = (creationTime, isActive) => {
    setTasks((tasks) => {
      const targetIndex = tasks.findIndex((el) => el.creationTime === creationTime)
      const targetTask = tasks[targetIndex]
      const newTask = {
        ...targetTask,
        isActive,
      }

      return [...tasks.slice(0, targetIndex), newTask, ...tasks.slice(targetIndex + 1)]
    })
  }

  const modifyTaskPausedTimerValue = (creationTime, pausedTimerValue) => {
    setTasks((tasks) => {
      const targetIndex = tasks.findIndex((el) => el.creationTime === creationTime)
      const targetTask = tasks[targetIndex]
      const newTask = {
        ...targetTask,
        pausedTimerValue,
      }

      return [...tasks.slice(0, targetIndex), newTask, ...tasks.slice(targetIndex + 1)]
    })
  }

  return {
    tasks,
    addTask,
    deleteTask,
    toggleCompleted,
    deleteAllCompleted,
    modifyTaskText,
    setTaskTimerStartingPoint,
    modifyTaskActivity,
    modifyTaskPausedTimerValue,
  }
}

export default useTaskList
