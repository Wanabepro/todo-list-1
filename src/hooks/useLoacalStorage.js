/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react"

const useLocalStorage = (tasks, setTasks) => {
  const tasksRef = useRef(tasks)

  useEffect(() => {
    tasksRef.current = tasks
  }, [tasks])

  useEffect(() => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"))

    if (tasksFromLocalStorage) {
      const preparedTasks = tasksFromLocalStorage.map((task) => ({
        ...task,
        creationTime: new Date(task.creationTime),
        targetTime: new Date(task.targetTime),
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
          targetTime: task.targetTime.getTime(),
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
