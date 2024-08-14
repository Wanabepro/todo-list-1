import { useEffect } from "react"

import type { task, setState } from "types"

const useLocalStorage = (tasks: Map<number, task>, setTasks: setState<Map<number, task>>) => {
  useEffect(() => {
    const tasksFromLocalStorage = localStorage.getItem("tasks")

    if (tasksFromLocalStorage) {
      const tasks: [number, task][] = JSON.parse(tasksFromLocalStorage)

      const preparedTasks: Map<number, task> = new Map(tasks)

      setTasks(preparedTasks)
    }
  }, [])

  useEffect(() => {
    const saveData = () => {
      if (tasks.size) {
        const preparedTasks = Array.from(tasks.entries())

        localStorage.setItem("tasks", JSON.stringify(preparedTasks))
      } else {
        localStorage.removeItem("tasks")
      }
    }

    window.addEventListener("beforeunload", saveData)

    return () => {
      window.removeEventListener("beforeunload", saveData)
    }
  }, [tasks])
}

export default useLocalStorage
