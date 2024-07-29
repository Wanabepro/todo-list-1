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
          pausedTimerValue: task.pausedTimerValue.getTime(),
        }))

        localStorage.setItem("tasks", JSON.stringify(preparedTasks))
      }

      return tasks
    }

    window.addEventListener("beforeunload", saveData)

    return () => {
      window.removeEventListener("beforeunload", saveData)
      saveData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useLocalStorage
