import { useState } from "react"

import modifyTaskContent from "../helpers/modifyTaskContent"

import useLocalStorage from "./useLoacalStorage"

import type { task, tasklist } from "types"

const useTaskList: () => tasklist = () => {
  const [tasks, setTasks] = useState<Map<number, task>>(new Map())

  useLocalStorage(tasks, setTasks)

  const addTask: tasklist["addTask"] = (text, targetTime = null) => {
    const newTask: task = {
      text,
      timerStartingPoint: new Date().getTime(),
      pausedTimerValue: new Date(0).getTime(),
      targetTime,
      completed: false,
      isActive: true,
    }

    const creationTime = new Date().getTime()

    setTasks((tasks) => {
      const copy = structuredClone(tasks)
      copy.set(creationTime, newTask)

      return copy
    })
  }

  const deleteTask: tasklist["deleteTask"] = (creationTime) => {
    setTasks((tasks) => {
      const copy = structuredClone(tasks)

      if (copy.has(creationTime)) {
        copy.delete(creationTime)
      }

      return copy
    })
  }

  const deleteAllCompleted: tasklist["deleteAllCompleted"] = () => {
    setTasks((tasks) => {
      const copy = structuredClone(tasks)

      copy.forEach((task, creationTime) => {
        if (task.completed) {
          copy.delete(creationTime)
        }
      })

      return copy
    })
  }

  const toggleCompleted: tasklist["toggleCompleted"] = (creationTime) => {
    setTasks((tasks) => {
      const copy = structuredClone(tasks)

      const targetTask = copy.get(creationTime)

      if (targetTask) {
        copy.set(creationTime, modifyTaskContent(targetTask, { completed: !targetTask.completed }))
      }

      return copy
    })
  }

  const modifyTaskText: tasklist["modifyTaskText"] = (creationTime, newText) => {
    setTasks((tasks) => {
      const copy = structuredClone(tasks)

      const targetTask = copy.get(creationTime)

      if (targetTask) {
        copy.set(creationTime, modifyTaskContent(targetTask, { text: newText }))
      }

      return copy
    })
  }

  const startTimer: tasklist["startTimer"] = (creationTime, currentTime) => {
    setTasks((tasks) => {
      const copy = structuredClone(tasks)

      const targetTask = copy.get(creationTime)

      if (targetTask) {
        const newTask = modifyTaskContent(targetTask, { isActive: true })

        if (!targetTask.targetTime) {
          newTask.timerStartingPoint = currentTime - targetTask.pausedTimerValue
        } else if (targetTask.pausedTimerValue >= 1000) {
          newTask.targetTime = currentTime + targetTask.pausedTimerValue
        }

        copy.set(creationTime, newTask)
      }

      return copy
    })
  }

  const stopTimer: tasklist["stopTimer"] = (creationTime, currentTime) => {
    setTasks((tasks) => {
      const copy = structuredClone(tasks)

      const targetTask = copy.get(creationTime)

      if (targetTask) {
        const newTask = modifyTaskContent(targetTask, { isActive: false })

        if (!targetTask.targetTime) {
          newTask.pausedTimerValue = currentTime - targetTask.timerStartingPoint
        } else {
          const pausedTimerValueMs = targetTask.targetTime - currentTime
          newTask.pausedTimerValue = pausedTimerValueMs < 1000 ? 0 : pausedTimerValueMs
        }

        copy.set(creationTime, newTask)
      }

      return copy
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
