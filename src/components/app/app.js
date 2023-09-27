import React, { useState } from 'react'

import NewTaskForm from '../newTaskForm/newTaskForm'
import TaskList from '../taskList/taskList'
import Footer from '../footer/footer'

import './app.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')

  const addTask = (text, initialTime) => {
    const newTask = {
      text,
      creationTime: new Date(),
      completed: false,
      initialTime,
    }

    setTasks((tasks) => [newTask, ...tasks])
  }

  const modifyTaskText = (creationTime, newText) => {
    setTasks((tasks) => {
      const targetIndex = tasks.findIndex((el) => el.creationTime === creationTime)
      const targetTask = tasks[targetIndex]
      const newTask = {
        ...targetTask,
        text: newText,
      }

      return [...tasks.slice(0, targetIndex), newTask, ...tasks.slice(targetIndex + 1)]
    })
  }

  const deleteTask = (creationTime) => {
    setTasks((tasks) => tasks.filter((task) => task.creationTime !== creationTime))
  }

  const deleteAllCompleted = () => {
    setTasks((tasks) => tasks.filter((task) => !task.completed))
  }

  const toggleCompleted = (creationTime) => {
    setTasks((tasks) => {
      const targetIndex = tasks.findIndex((task) => task.creationTime === creationTime)
      const targetTask = tasks[targetIndex]
      return [
        ...tasks.slice(0, targetIndex),
        { ...targetTask, completed: !targetTask.completed },
        ...tasks.slice(targetIndex + 1),
      ]
    })
  }

  const changeInitialTime = (creationTime, initialTime) => {
    setTasks((tasks) => {
      const targetIndex = tasks.findIndex((task) => task.creationTime === creationTime)
      if (targetIndex === -1) {
        return tasks
      }
      const targetTask = tasks[targetIndex]
      const newTask = { ...targetTask, initialTime }
      return [...tasks.slice(0, targetIndex), newTask, ...tasks.slice(targetIndex + 1)]
    })
  }

  const filterTasks = () => {
    if (filter === 'Active') return tasks.filter((task) => !task.completed)
    if (filter === 'Completed') return tasks.filter((task) => task.completed)
    return tasks
  }

  const taskListAttributes = {
    tasks: filterTasks(),
    deleteTask,
    toggleCompleted,
    modifyTaskText,
    filter,
    changeInitialTime,
  }

  const uncompletedCount = 0

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addTask={addTask} />
      </header>
      <section className="main">
        <TaskList {...taskListAttributes} />
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
