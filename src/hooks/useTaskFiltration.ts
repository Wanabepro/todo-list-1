import { useState } from "react"

import type { task, filters } from "types"

type filterFunction = (tasks: Map<number, task>) => Map<number, task>

const filters: { [key in filters]: filterFunction } = {
  Active: (tasks) => new Map(Array.from(tasks.entries()).filter((task) => !task[1].completed)),
  Completed: (tasks) => new Map(Array.from(tasks.entries()).filter((task) => task[1].completed)),
  All: (tasks) => tasks,
}

const useTaskFiltration = (tasks: Map<number, task>) => {
  const [filter, setFilter] = useState<filters>("All")

  const filterTasks = () => filters[filter](tasks)

  const uncompletedCount = filters.Active(tasks).size

  return { filter, setFilter, filterTasks, uncompletedCount }
}

export default useTaskFiltration
