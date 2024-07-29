import React from 'react'

import './tasksFilter.css'

function TasksFilter({ filter, setFilter }) {
  return (
    <ul className="filters">
      <li>
        <label htmlFor="all">
          <input
            type="radio"
            name="filter"
            id="all"
            value="All"
            checked={filter === 'All'}
            onChange={(e) => setFilter(e.target.value)}
          />
          All
        </label>
      </li>
      <li>
        <label htmlFor="active">
          <input
            type="radio"
            name="filter"
            id="active"
            value="Active"
            checked={filter === 'Active'}
            onChange={(e) => setFilter(e.target.value)}
          />
          Active
        </label>
      </li>
      <li>
        <label htmlFor="completed">
          <input
            type="radio"
            name="filter"
            id="completed"
            value="Completed"
            checked={filter === 'Completed'}
            onChange={(e) => setFilter(e.target.value)}
          />
          Completed
        </label>
      </li>
    </ul>
  )
}

export default TasksFilter
