import { useState } from "react"

import findTaskByCreationTime from "../helpers/findTaskByCreationTime"
import modifyTaskContent from "../helpers/modifyTaskContent"

import useLocalStorage from "./useLoacalStorage"

import type { task, tasklist } from "types"

const useTaskList: () => tasklist = () => {
  const [tasks, setTasks] = useState<task[]>([])

  useLocalStorage(tasks, setTasks)

  const addTask: tasklist["addTask"] = (text, targetTime = null) => {
    const newTask: task = {
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

  const deleteTask: tasklist["deleteTask"] = (creationTime) => {
    setTasks((tasks) => tasks.filter((task) => task.creationTime !== creationTime))
  }

  const deleteAllCompleted: tasklist["deleteAllCompleted"] = () => {
    setTasks((tasks) => tasks.filter((task) => !task.completed))
  }

  const toggleCompleted: tasklist["toggleCompleted"] = (creationTime) => {
    setTasks((tasks) => {
      const [targetIndex, targetTask] = findTaskByCreationTime(creationTime, tasks)
      const newTask = modifyTaskContent(targetTask, { completed: !targetTask.completed })

      return [...tasks.slice(0, targetIndex), newTask, ...tasks.slice(targetIndex + 1)]
    })
  }

  const modifyTaskText: tasklist["modifyTaskText"] = (creationTime, newText) => {
    setTasks((tasks) => {
      const [targetIndex, targetTask] = findTaskByCreationTime(creationTime, tasks)
      const newTask = modifyTaskContent(targetTask, { text: newText })

      return [...tasks.slice(0, targetIndex), newTask, ...tasks.slice(targetIndex + 1)]
    })
  }

  const startTimer: tasklist["startTimer"] = (creationTime, currentTime) => {
    setTasks((tasks) => {
      const [targetIndex, targetTask] = findTaskByCreationTime(creationTime, tasks)
      const newTask = modifyTaskContent(targetTask, { isActive: true })

      if (!targetTask.targetTime) {
        newTask.timerStartingPoint = new Date(
          currentTime.getTime() - targetTask.pausedTimerValue.getTime(),
        )
      } else if (targetTask.pausedTimerValue.getTime() >= 1000) {
        newTask.targetTime = new Date(currentTime.getTime() + targetTask.pausedTimerValue.getTime())
      }

      return [...tasks.slice(0, targetIndex), newTask, ...tasks.slice(targetIndex + 1)]
    })
  }

  const stopTimer: tasklist["stopTimer"] = (creationTime, currentTime) => {
    setTasks((tasks) => {
      const [targetIndex, targetTask] = findTaskByCreationTime(creationTime, tasks)
      const newTask = modifyTaskContent(targetTask, { isActive: false })

      if (!targetTask.targetTime) {
        newTask.pausedTimerValue = new Date(
          currentTime.getTime() - targetTask.timerStartingPoint.getTime(),
        )
      } else {
        const pausedTimerValueMs = targetTask.targetTime.getTime() - currentTime.getTime()
        newTask.pausedTimerValue = new Date(pausedTimerValueMs < 1000 ? 0 : pausedTimerValueMs)
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
