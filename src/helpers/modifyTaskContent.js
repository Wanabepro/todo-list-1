const modifyTaskContent = (task, modifiedValues) => ({
  ...task,
  ...modifiedValues,
})

export default modifyTaskContent
