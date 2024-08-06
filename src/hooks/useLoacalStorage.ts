import { useEffect, useRef } from "react"

import type { task, setState } from "types"

type notEmptyString = string & { [K in ""]?: never }

interface taskFromLocalStorage
  extends Omit<task, "creationTime" | "targetTime" | "timerStartingPoint" | "pausedTimerValue"> {
  creationTime: string
  targetTime: notEmptyString | null
  timerStartingPoint: string
  pausedTimerValue: string
}

const useLocalStorage = (tasks: task[], setTasks: setState<task[]>) => {
  const tasksRef = useRef(tasks)

  useEffect(() => {
    tasksRef.current = tasks
  }, [tasks])

  useEffect(() => {
    const tasksFromLocalStorage = localStorage.getItem("tasks")

    if (tasksFromLocalStorage) {
      const tasks: taskFromLocalStorage[] = JSON.parse(tasksFromLocalStorage)

      const preparedTasks: task[] = tasks.map((task) => ({
        ...task,
        creationTime: new Date(task.creationTime),
        targetTime: task.targetTime && new Date(task.targetTime),
        timerStartingPoint: new Date(task.timerStartingPoint),
        pausedTimerValue: new Date(task.pausedTimerValue),
      }))

      setTasks(preparedTasks)
    }

    const saveData = () => {
      const tasks = tasksRef.current
      if (tasks.length) {
        const preparedTasks = tasks.map((task) => ({
          ...task,
          creationTime: task.creationTime.getTime(),
          targetTime: task.targetTime && task.targetTime.getTime(),
          timerStartingPoint: task.timerStartingPoint.getTime(),
          pausedTimerValue: task.pausedTimerValue.getTime(),
        }))

        localStorage.setItem("tasks", JSON.stringify(preparedTasks))
      } else {
        localStorage.removeItem("tasks")
      }

      return tasks
    }

    window.addEventListener("beforeunload", saveData)

    return () => {
      window.removeEventListener("beforeunload", saveData)
      saveData()
    }
  }, [])
}

export default useLocalStorage
