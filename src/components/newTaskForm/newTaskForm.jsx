import React, { useState } from 'react'

import './newTaskForm.css'

function NewTaskForm({ addTask }) {
  const [text, setText] = useState('')
  const [wasFocused, setWasFocused] = useState(false)
  const [time, setTime] = useState({ minutes: '', seconds: '' })

  const changeHandler = (e) => {
    const { name, value } = e.target
    if (name === 'minutes' || name === 'seconds') {
      if (!Number.isNaN(Number(value))) {
        setTime((time) => ({ ...time, [name]: value }))
      }
    } else {
      setText(value)
    }
  }

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      const { minutes, seconds } = time

      if (text && minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60) {
        addTask(text, minutes * 60 + Number(seconds))

        setText('')
        setWasFocused(false)
        setTime({ minutes: '', seconds: '' })
      }
    }
  }

  const blurHandler = () => {
    setWasFocused(true)
  }

  const timeIsInvalid = (type) => {
    const { [type]: value } = time
    return value > 59
  }

  return (
    <form className="new-todo-form">
      <input
        required
        name="text"
        className={`new-todo${wasFocused && !text ? ' invalid' : ''}`}
        placeholder="What needs to be done?"
        value={text}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
        onBlur={blurHandler}
      />
      <input
        name="minutes"
        className={`new-todo-form__timer${timeIsInvalid('minutes') ? ' invalid' : ''}`}
        placeholder="Min"
        value={time.minutes}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
      />
      <input
        name="seconds"
        className={`new-todo-form__timer${timeIsInvalid('seconds') ? ' invalid' : ''}`}
        placeholder="Sec"
        value={time.seconds}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
      />
    </form>
  )
}

export default NewTaskForm
