import { useEffect, useRef } from "react"

import type { task, setState } from "types"

const useLocalStorage = (tasks: Map<number, task>, setTasks: setState<Map<number, task>>) => {
  const tasksRef = useRef(tasks)

  useEffect(() => {
    tasksRef.current = tasks
  }, [tasks])

  useEffect(() => {
    const tasksFromLocalStorage = localStorage.getItem("tasks")

    if (tasksFromLocalStorage) {
      const tasks: [number, task][] = JSON.parse(tasksFromLocalStorage)

      const preparedTasks: Map<number, task> = new Map(tasks)

      setTasks(preparedTasks)
    }

    const saveData = () => {
      const tasks = tasksRef.current

      if (tasks.size) {
        const preparedTasks = Array.from(tasks.entries())

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
