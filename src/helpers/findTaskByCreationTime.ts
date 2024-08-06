import type { task } from "types"

type findTask = (creationTime: Date, tasks: task[]) => [number, task]

const findTaskByCreationTime: findTask = (creationTime, tasks) => {
  const targetIndex = tasks.findIndex((task) => task.creationTime === creationTime)
  const targetTask = tasks[targetIndex]

  return [targetIndex, targetTask]
}

export default findTaskByCreationTime
