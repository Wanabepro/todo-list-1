import React from "react"

import "./tasksFilter.css"

import type { filters, setState } from "types"

enum filtersEnum {
  All = "All",
  Active = "Active",
  Completed = "Completed",
}

const TasksFilter: React.FC<{ filter: filters; setFilter: setState<filters> }> = ({
  filter,
  setFilter,
}) => {
  return (
    <ul className="filters">
      <li>
        <label htmlFor="all">
          <input
            type="radio"
            name="filter"
            id="all"
            value={filtersEnum.All}
            checked={filter === filtersEnum.All}
            onChange={(e) => setFilter(e.target.value as filters)}
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
            value={filtersEnum.Active}
            checked={filter === filtersEnum.Active}
            onChange={(e) => setFilter(e.target.value as filters)}
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
            value={filtersEnum.Completed}
            checked={filter === filtersEnum.Completed}
            onChange={(e) => setFilter(e.target.value as filters)}
          />
          Completed
        </label>
      </li>
    </ul>
  )
}

export default TasksFilter
