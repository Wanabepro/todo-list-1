import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../tasksFilter'

import './footer.css'

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

Footer.propTypes = {
  uncompletedCount: PropTypes.number,
  deleteAllCompleted: PropTypes.func,
  filter: PropTypes.oneOf(['All', 'Active', 'Completed']),
  setFilter: PropTypes.func,
}

Footer.defaultProps = {
  uncompletedCount: 0,
  deleteAllCompleted: () => {},
  filter: 'All',
  setFilter: () => {},
}

export default Footer
