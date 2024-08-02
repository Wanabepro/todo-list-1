import { useState } from "react"

const filters = {
  Active: (tasks) => tasks.filter((task) => !task.completed),
  Completed: (tasks) => tasks.filter((task) => task.completed),
  All: (tasks) => tasks,
}

const useTaskFiltration = (tasks) => {
  const [filter, setFilter] = useState("All")

  const filterTasks = () => filters[filter](tasks)

  const uncompletedCount = filters.Active(tasks).length

  return { filter, setFilter, filterTasks, uncompletedCount }
}

export default useTaskFiltration
