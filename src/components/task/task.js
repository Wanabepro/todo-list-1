import React, { useEffect, useRef, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import convertSecondsToTimeString from '../../helpers/convertSecondsToTimeString'
import './task.css'

function Task({
  text,
  creationTime,
  completed,
  initialTime,
  deleteTask,
  toggleCompleted,
  modifyTaskText,
  changeInitialTime,
}) {
  const [editing, setEditing] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [time, setTime] = useState(0)

  const inputRef = useRef(null)

  useEffect(() => {
    if (editing === true) {
      inputRef.current.focus()
    }
  }, [editing])

  const timer = useRef(null)

  const updateTimer = () => {
    setTime((time) => time + 1)
  }

  const startTimer = () => {
    if (!timer.current) {
      timer.current = setInterval(updateTimer, 1000)
    }
  }

  const stopTimer = () => {
    clearInterval(timer.current)
    timer.current = null
  }

  useEffect(() => {
    setInputValue(text)
    startTimer()

    return () => {
      stopTimer()
      changeInitialTime(creationTime, initialTime + time)
    }
  }, [])

  const toggleEditing = () => {
    setEditing((editing) => !editing)
  }

  const submitHandler = (e) => {
    if (e.key === 'Enter') {
      modifyTaskText(creationTime, inputValue)
      toggleEditing()
    }

    if (e.key === 'Escape') {
      toggleEditing()
    }
  }

  const completeHandler = () => {
    if (!completed) {
      stopTimer()
    } else {
      startTimer()
    }

    toggleCompleted(creationTime)
  }

  return (
    <>
      <div className={`view ${editing ? 'disabled' : ''}`}>
        <input
          id={`toggle${creationTime}`}
          className="toggle"
          type="checkbox"
          onChange={() => {
            completeHandler()
          }}
          checked={completed}
        />
        <label htmlFor={`toggle${creationTime}`}>
          <span className="title">{text}</span>
          <span className="description">
            <button className="icon icon-play" type="button" onClick={startTimer}>
              <span>play</span>
            </button>
            <button className="icon icon-pause" type="button" onClick={stopTimer}>
              <span>pause</span>
            </button>
            {convertSecondsToTimeString(initialTime + time)}
          </span>
          <span className="description">{`created ${formatDistanceToNow(creationTime)} ago`}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={toggleEditing}>
          <span>edit</span>
        </button>
        <button type="button" className="icon icon-destroy" onClick={() => deleteTask(creationTime)}>
          <span>delete</span>
        </button>
      </div>
      <input
        autoFocus
        ref={inputRef}
        required
        type="text"
        className={`edit ${editing ? '' : 'disabled'}`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={submitHandler}
      />
    </>
  )
}

Task.propTypes = {
  text: PropTypes.string,
  creationTime: PropTypes.instanceOf(Date),
  completed: PropTypes.bool,
  initialTime: PropTypes.number,
  deleteTask: PropTypes.func,
  toggleCompleted: PropTypes.func,
  modifyTaskText: PropTypes.func,
  changeInitialTime: PropTypes.func,
}

Task.defaultProps = {
  text: '',
  creationTime: new Date(),
  completed: false,
  initialTime: 0,
  deleteTask: () => {},
  toggleCompleted: () => {},
  modifyTaskText: () => {},
  changeInitialTime: () => {},
}

export default Task
