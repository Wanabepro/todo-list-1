import { useState } from "react"

import findTaskByCreationTime from "../helpers/findTaskByCreationTime"
import modifyTaskContent from "../helpers/modifyTaskContent"

import useLocalStorage from "./useLoacalStorage"

const useTaskList = () => {
  const [tasks, setTasks] = useState([])

  useLocalStorage(tasks, setTasks)

  const addTask = (text, targetTime = null) => {
    const newTask = {
      text,
      creationTime: new Date(),
      timerStartingPoint: new Date(),
      pausedTimerValue: new Date(0),
      targetTime,
      completed: false,
      isActive: true,
    }

    setTasks((tasks) => [newTask, ...tasks])
  }

  const deleteTask = (creationTime) => {
    setTasks((tasks) => tasks.filter((task) => task.creationTime !== creationTime))
  }

  const deleteAllCompleted = () => {
    setTasks((tasks) => tasks.filter((task) => !task.completed))
  }

  const toggleCompleted = (creationTime) => {
    setTasks((tasks) => {
      const [targetIndex, targetTask] = findTaskByCreationTime(creationTime, tasks)
      const newTask = modifyTaskContent(targetTask, { completed: !targetTask.completed })

      return [...tasks.slice(0, targetIndex), newTask, ...tasks.slice(targetIndex + 1)]
    })
  }

  const modifyTaskText = (creationTime, newText) => {
    setTasks((tasks) => {
      const [targetIndex, targetTask] = findTaskByCreationTime(creationTime, tasks)
      const newTask = modifyTaskContent(targetTask, { text: newText })

      return [...tasks.slice(0, targetIndex), newTask, ...tasks.slice(targetIndex + 1)]
    })
  }

  const startTimer = (creationTime, currentTime) => {
    setTasks((tasks) => {
      const [targetIndex, targetTask] = findTaskByCreationTime(creationTime, tasks)
      const newTask = modifyTaskContent(targetTask, { isActive: true })

      if (targetTask.targetTime) {
        newTask.targetTime = new Date(currentTime + newTask.pausedTimerValue)
      } else {
        newTask.timerStartingPoint = new Date(currentTime - newTask.pausedTimerValue)
      }

      return [...tasks.slice(0, targetIndex), newTask, ...tasks.slice(targetIndex + 1)]
    })
  }

  const stopTimer = (creationTime, currentTime) => {
    setTasks((tasks) => {
      const [targetIndex, targetTask] = findTaskByCreationTime(creationTime, tasks)
      const newTask = modifyTaskContent(targetTask, { isActive: false })

      if (targetTask.targetTime) {
        const pausedTimerValueMs = newTask.targetTime - currentTime
        newTask.pausedTimerValue = new Date(pausedTimerValueMs < 0 ? 0 : pausedTimerValueMs)
      } else {
        newTask.pausedTimerValue = new Date(currentTime - newTask.timerStartingPoint)
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
    startTimer,
    stopTimer,
  }
}

export default useTaskList
