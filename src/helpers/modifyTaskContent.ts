import { task } from "../types"

const modifyTaskContent = (task: task, modifiedValues: Partial<task>) => ({
  ...task,
  ...modifiedValues,
})

export default modifyTaskContent
