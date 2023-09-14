import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import convertSecondsToTimeString from '../../helpers/convertSecondsToTimeString'
import './task.css'

class Task extends Component {
  static propTypes = {
    text: PropTypes.string,
    creationTime: PropTypes.instanceOf(Date),
    completed: PropTypes.bool,
    initialTime: PropTypes.number,
    deleteTask: PropTypes.func,
    toggleCompleted: PropTypes.func,
  }

  static defaultProps = {
    text: '',
    creationTime: new Date(),
    completed: false,
    initialTime: 0,
    deleteTask: () => {},
    toggleCompleted: () => {},
  }

  state = {
    editing: false,
    inputValue: this.props.text,
    time: this.props.initialTime,
  }

  timer = null

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  startTimer = () => {
    if (!this.timer) {
      this.timer = setInterval(this.updateTimer, 1000)
    }
  }

  updateTimer = () => {
    this.setState(({ time: prevTime }) => ({ time: prevTime + 1 }))
  }

  stopTimer = () => {
    clearInterval(this.timer)
    this.timer = null
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

  completeHandler = () => {
    const { completed } = this.props
    if (!completed) {
      this.stopTimer()
    } else {
      this.startTimer()
    }

    this.props.toggleCompleted(this.props.creationTime)
  }

  render() {
    const { text, creationTime, completed, deleteTask } = this.props
    const { editing, inputValue, time } = this.state

    return (
      <>
        <div className={`view ${editing ? 'disabled' : ''}`}>
          <input
            id={`toggle${creationTime}`}
            className="toggle"
            type="checkbox"
            onChange={() => {
              this.completeHandler()
            }}
            checked={completed}
          />
          <label htmlFor={`toggle${creationTime}`}>
            <span className="title">{text}</span>
            <span className="description">
              <button className="icon icon-play" type="button" onClick={this.startTimer}>
                <span>play</span>
              </button>
              <button className="icon icon-pause" type="button" onClick={this.stopTimer}>
                <span>pause</span>
              </button>
              {convertSecondsToTimeString(time)}
            </span>
            <span className="description">{`created ${formatDistanceToNow(creationTime)} ago`}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={this.toggleEditing}>
            <span>edit</span>
          </button>
          <button type="button" className="icon icon-destroy" onClick={() => deleteTask(creationTime)}>
            <span>delete</span>
          </button>
        </div>
        <input
          required
          autoFocus
          type="text"
          className={`edit ${editing ? '' : 'disabled'}`}
          value={inputValue}
          onChange={this.changeHandler}
          onKeyDown={this.submitHandler}
        />
      </>
    )
  }
}

export default Task
