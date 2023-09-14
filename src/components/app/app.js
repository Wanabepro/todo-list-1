import React, { Component } from 'react'

import NewTaskForm from '../newTaskForm/newTaskForm'
import TaskList from '../taskList/taskList'
import Footer from '../footer/footer'

import './app.css'

class App extends Component {
  state = {
    tasks: [],
    filter: 'All',
  }

  filterTasks = () => {
    const { tasks, filter } = this.state
    if (filter === 'Active') return tasks.filter((task) => !task.completed)
    if (filter === 'Completed') return tasks.filter((task) => task.completed)
    return tasks
  }

  setFilter = (filterName) => {
    this.setState(() => ({ filter: filterName }))
  }

  addTask = (text, initialTime) => {
    this.setState(({ tasks }) => ({
      tasks: [{ text, creationTime: new Date(), completed: false, initialTime }, ...tasks],
    }))
  }

  modifyTaskText = (creationTime, newText) => {
    this.setState(({ tasks }) => {
      const targetIndex = tasks.findIndex((el) => el.creationTime === creationTime)
      const targetTask = tasks[targetIndex]
      const newTask = {
        ...targetTask,
        text: newText,
      }

      return {
        tasks: [...tasks.slice(0, targetIndex), newTask, ...tasks.slice(targetIndex + 1)],
      }
    })
  }

  deleteTask = (creationTime) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.creationTime !== creationTime),
    }))
  }

  deleteAllCompleted = () => {
    this.setState(({ tasks }) => ({ tasks: tasks.filter((task) => !task.completed) }))
  }

  toggleCompleted = (creationTime) => {
    this.setState(({ tasks }) => {
      const targetIdx = tasks.findIndex((task) => task.creationTime === creationTime)
      const targetTask = tasks[targetIdx]
      return {
        tasks: [
          ...tasks.slice(0, targetIdx),
          { ...targetTask, completed: !targetTask.completed },
          ...tasks.slice(targetIdx + 1),
        ],
      }
    })
  }

  render() {
    const { tasks, filter } = this.state
    const uncompletedCount = tasks.length - tasks.filter((task) => task.completed).length
    const taskListAttributes = {
      tasks: this.filterTasks(),
      deleteTask: this.deleteTask,
      toggleCompleted: this.toggleCompleted,
      modifyTaskText: this.modifyTaskText,
      filter,
    }

    return (
      <>
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addTask={this.addTask} />
        </header>
        <section className="main">
          <TaskList {...taskListAttributes} />
          <Footer
            uncompletedCount={uncompletedCount}
            deleteAllCompleted={this.deleteAllCompleted}
            filter={filter}
            setFilter={this.setFilter}
          />
        </section>
      </>
    )
  }
}

export default App
