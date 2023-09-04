import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task'

import './taskList.css'

function TaskList({ tasks, filter, deleteTask, toggleCompleted, modifyTaskText }) {
  return (
    <>
      <ul className="todo-list">
        {tasks.map((task) => {
          const taskAttributes = {
            ...task,
            key: task.creationTime.getTime(),
            deleteTask,
            toggleCompleted,
            modifyTaskText,
          }
          return <Task {...taskAttributes} />
        })}
      </ul>
      {tasks.length === 0 && filter === 'All' && <div className="message">No tasks</div>}
      {tasks.length === 0 && filter === 'Active' && <div className="message">No active tasks</div>}
      {tasks.length === 0 && filter === 'Completed' && <div className="message">No completed tasks</div>}
    </>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      creationTime: PropTypes.instanceOf(Date),
      completed: PropTypes.bool,
    }),
  ),
  deleteTask: PropTypes.func,
  toggleCompleted: PropTypes.func,
}

TaskList.defaultProps = {
  tasks: [],
  deleteTask: () => {},
  toggleCompleted: () => {},
}

export default TaskList
