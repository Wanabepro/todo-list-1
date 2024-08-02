import useTaskList from "../../hooks/useTaskList"
import useTaskFiltration from "../../hooks/useTaskFiltration"
import NewTaskForm from "../newTaskForm/newTaskForm"
import TaskList from "../taskList/taskList"
import Footer from "../footer/footer"

import "./app.css"

function App() {
  const {
    tasks,
    addTask,
    deleteTask,
    toggleCompleted,
    deleteAllCompleted,
    modifyTaskText,
    setTaskTimerStartingPoint,
    modifyTaskActivity,
    modifyTaskPausedTimerValue,
  } = useTaskList()

  const { filter, setFilter, filterTasks, uncompletedCount } = useTaskFiltration(tasks)

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={filterTasks()}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
          modifyTaskText={modifyTaskText}
          setTaskTimerStartingPoint={setTaskTimerStartingPoint}
          modifyTaskPausedTimerValue={modifyTaskPausedTimerValue}
          modifyTaskActivity={modifyTaskActivity}
          filter={filter}
        />
        <Footer
          uncompletedCount={uncompletedCount}
          deleteAllCompleted={deleteAllCompleted}
          filter={filter}
          setFilter={setFilter}
        />
      </section>
    </>
  )
}

export default App
