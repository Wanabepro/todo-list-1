import React from 'react'
import PropTypes from 'prop-types'

import './tasksFilter.css'

function TasksFilter({ filter, setFilter }) {
  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={filter === 'All' ? 'selected' : ''}
          onClick={() => {
            setFilter('All')
          }}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filter === 'Active' ? 'selected' : ''}
          onClick={() => {
            setFilter('Active')
          }}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filter === 'Completed' ? 'selected' : ''}
          onClick={() => {
            setFilter('Completed')
          }}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

TasksFilter.propTypes = {
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
  setFilter: PropTypes.func,
}

TasksFilter.defaultProps = {
  filter: 'All',
  setFilter: () => {},
}

export default TasksFilter
