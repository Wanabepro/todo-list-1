import TasksFilter from "../tasksFilter"

import "./footer.css"

import type { filters, setState } from "../../types"

interface IFooterProps {
  uncompletedCount: number
  deleteAllCompleted: () => void
  filter: filters
  setFilter: setState<filters>
}

const Footer: React.FC<IFooterProps> = ({
  uncompletedCount,
  deleteAllCompleted,
  filter,
  setFilter,
}) => {
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
