const findTaskByCreationTime = (creationTime, tasks) => {
  const targetIndex = tasks.findIndex((task) => task.creationTime === creationTime)
  const targetTask = tasks[targetIndex]

  return [targetIndex, targetTask]
}

export default findTaskByCreationTime
