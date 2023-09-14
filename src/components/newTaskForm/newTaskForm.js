import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './newTaskForm.css'

class NewTaskForm extends Component {
  static propTypes = {
    addTask: PropTypes.func,
  }

  static defaultProps = {
    addTask: () => {},
  }

  state = {
    text: '',
    textWasFocused: false,
    minutes: '',
    seconds: '',
  }

  changeHandler = (e) => {
    const { name, value } = e.target
    if (name === 'minutes' || name === 'seconds') {
      if (!Number.isNaN(Number(value))) {
        this.setState({ [name]: value })
      }
    } else {
      this.setState({ [name]: value })
    }
  }

  keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      const { addTask } = this.props
      const { text, minutes, seconds } = this.state

      if (text && minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60) {
        addTask(text, minutes * 60 + Number(seconds))

        this.setState({ text: '', textWasFocused: false, minutes: '', seconds: '' })
      }
    }
  }

  blurHandler = () => {
    this.setState({ textWasFocused: true })
  }

  textIsInvalid() {
    const { text } = this.state
    return !text
  }

  timeIsInvalid(type) {
    const { [type]: time } = this.state
    return time > 59
  }

  render() {
    const { text, textWasFocused, minutes, seconds } = this.state
    return (
      <form className="new-todo-form">
        <input
          required
          autoFocus
          name="text"
          className={`new-todo${textWasFocused && this.textIsInvalid() ? ' invalid' : ''}`}
          placeholder="What needs to be done?"
          value={text}
          onChange={this.changeHandler}
          onKeyDown={this.keyDownHandler}
          onBlur={this.blurHandler}
        />
        <input
          name="minutes"
          className={`new-todo-form__timer${this.timeIsInvalid('minutes') ? ' invalid' : ''}`}
          placeholder="Min"
          value={minutes}
          onChange={this.changeHandler}
          onKeyDown={this.keyDownHandler}
        />
        <input
          name="seconds"
          className={`new-todo-form__timer${this.timeIsInvalid('seconds') ? ' invalid' : ''}`}
          placeholder="Sec"
          value={seconds}
          onChange={this.changeHandler}
          onKeyDown={this.keyDownHandler}
        />
      </form>
    )
  }
}

export default NewTaskForm
