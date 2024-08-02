import React, { useEffect, useRef, useState } from "react"
import { formatDistanceToNow } from "date-fns"

import convertSecondsToTimeString from "../../helpers/convertSecondsToTimeString"
import "./task.css"

function Task({
  text,
  creationTime,
  timerStartingPoint,
  pausedTimerValue,
  currentTime,
  completed,
  isActive,
  deleteTask,
  toggleCompleted,
  modifyTaskText,
  setTaskTimerStartingPoint,
  modifyTaskPausedTimerValue,
  modifyTaskActivity,
}) {
  const [editing, setEditing] = useState(false)
  const [inputValue, setInputValue] = useState(text)

  const inputRef = useRef(null)

  useEffect(() => {
    if (editing === true) {
      inputRef.current.focus()
    }
  }, [editing])

  const toggleEditing = () => {
    setEditing((editing) => !editing)
  }

  const submitHandler = (e) => {
    if (e.key === "Enter") {
      modifyTaskText(creationTime, inputValue)
      toggleEditing()
    }

    if (e.key === "Escape") {
      toggleEditing()
    }
  }

  const startTimer = () => {
    modifyTaskActivity(creationTime, true)
    setTaskTimerStartingPoint(creationTime, new Date(currentTime - pausedTimerValue))
  }

  const stopTimer = () => {
    modifyTaskActivity(creationTime, false)
    modifyTaskPausedTimerValue(creationTime, new Date(currentTime - timerStartingPoint))
  }

  const completeHandler = () => {
    toggleCompleted(creationTime)

    if (!completed) {
      if (isActive) stopTimer()
    } else {
      startTimer()
    }
  }

  return (
    <>
      <div className={`view ${editing ? "disabled" : ""}`}>
        <input
          id={`toggle${creationTime.getTime()}`}
          className="toggle"
          type="checkbox"
          onChange={() => {
            completeHandler()
          }}
          checked={completed}
        />
        <label htmlFor={`toggle${creationTime.getTime()}`}>
          <span className="title">{text}</span>
          <span className="description">
            <button
              className="icon icon-play"
              type="button"
              disabled={isActive || completed}
              onClick={startTimer}
            >
              <span>play</span>
            </button>
            <button
              className="icon icon-pause"
              type="button"
              disabled={!isActive || completed}
              onClick={stopTimer}
            >
              <span>pause</span>
            </button>
            {isActive
              ? convertSecondsToTimeString(currentTime - timerStartingPoint)
              : convertSecondsToTimeString(pausedTimerValue)}
          </span>
          <span className="description">{`created ${formatDistanceToNow(creationTime)} ago`}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={toggleEditing}>
          <span>edit</span>
        </button>
        <button
          type="button"
          className="icon icon-destroy"
          onClick={() => deleteTask(creationTime)}
        >
          <span>delete</span>
        </button>
      </div>
      <input
        autoFocus
        ref={inputRef}
        required
        type="text"
        className={`edit ${editing ? "" : "disabled"}`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={submitHandler}
      />
    </>
  )
}

export default Task
