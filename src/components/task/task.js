import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './task.css'

class Task extends Component {
  static propTypes = {
    text: PropTypes.string,
    creationTime: PropTypes.instanceOf(Date),
    completed: PropTypes.bool,
    deleteTask: PropTypes.func,
    toggleCompleted: PropTypes.func,
  }

  static defaultProps = {
    text: '',
    creationTime: new Date(),
    completed: false,
    deleteTask: () => {},
    toggleCompleted: () => {},
  }

  state = {
    editing: false,
    inputValue: this.props.text,
  }

  changeHandler = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  submitHandler = (e) => {
    if (e.key === 'Enter') {
      const { modifyTaskText, creationTime } = this.props
      const { inputValue } = this.state

      modifyTaskText(creationTime, inputValue)
      this.toggleEditing()
    }

    if (e.key === 'Escape') {
      this.toggleEditing()
    }
  }

  toggleEditing = () => {
    this.setState(({ editing }) => ({
      editing: !editing,
    }))
  }

  render() {
    const { text, creationTime, completed, deleteTask, toggleCompleted } = this.props
    const { editing, inputValue } = this.state

    return (
      <li className={`${editing ? 'editing' : ''} ${completed ? 'completed' : ''}`}>
        <div className="view">
          <input
            id={`toggle${creationTime}`}
            className="toggle"
            type="checkbox"
            onChange={() => {
              toggleCompleted(creationTime)
            }}
            checked={completed}
          />
          <label htmlFor={`toggle${creationTime}`}>
            <span className="description">{text}</span>
            <span className="created">{`created ${formatDistanceToNow(creationTime)} ago`}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={this.toggleEditing}>
            <span>edit</span>
          </button>
          <button type="button" className="icon icon-destroy" onClick={() => deleteTask(creationTime)}>
            <span>delete</span>
          </button>
        </div>
        <input
          autoFocus
          type="text"
          className="edit"
          value={inputValue}
          onChange={this.changeHandler}
          onKeyDown={this.submitHandler}
        />
      </li>
    )
  }
}

export default Task
