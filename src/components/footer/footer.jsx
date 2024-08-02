import React from "react"

import TasksFilter from "../tasksFilter"

import "./footer.css"

function Footer({ uncompletedCount, deleteAllCompleted, filter, setFilter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{`${uncompletedCount} tasks left`}</span>
      <TasksFilter setFilter={setFilter} filter={filter} />
      <button type="button" className="clear-completed" onClick={deleteAllCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
