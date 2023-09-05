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
    inputValue: '',
  }

  changeHandler = (e) => {
    this.setState({ inputValue: e.target.value })
  }

  submitHandler = (e) => {
    e.preventDefault()
    const { addTask } = this.props
    const { inputValue } = this.state

    addTask(inputValue)
    this.setState({ inputValue: '' })
  }

  render() {
    const { inputValue } = this.state
    return (
      <form onSubmit={this.submitHandler}>
        <input
          required
          autoFocus
          className="new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={this.changeHandler}
        />
      </form>
    )
  }
}

export default NewTaskForm
