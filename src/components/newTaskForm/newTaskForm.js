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
    if (e.key === 'Enter') {
      const { addTask } = this.props
      const { inputValue } = this.state

      addTask(inputValue)
      this.setState({ inputValue: '' })
    }
  }

  render() {
    const { inputValue } = this.state
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={inputValue}
        onKeyDown={this.submitHandler}
        onChange={this.changeHandler}
      />
    )
  }
}

export default NewTaskForm
