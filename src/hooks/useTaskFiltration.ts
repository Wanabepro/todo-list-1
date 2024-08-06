import { useState } from "react"

import type { task, filters } from "types"

type filterFunction = (tasks: task[]) => task[]

const filters: { [key in filters]: filterFunction } = {
  Active: (tasks) => tasks.filter((task) => !task.completed),
  Completed: (tasks) => tasks.filter((task) => task.completed),
  All: (tasks) => tasks,
}

const useTaskFiltration = (tasks: task[]) => {
  const [filter, setFilter] = useState<filters>("All")

  const filterTasks = () => filters[filter](tasks)

  const uncompletedCount = filters.Active(tasks).length

  return { filter, setFilter, filterTasks, uncompletedCount }
}

export default useTaskFiltration
