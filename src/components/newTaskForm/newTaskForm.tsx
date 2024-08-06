import React, { useState } from "react"

import "./newTaskForm.css"
import calculateTargetTime from "../../helpers/calcuclateTargetTime"

import type { tasklist } from "types"

const NewTaskForm: React.FC<{ addTask: tasklist["addTask"] }> = ({ addTask }) => {
  const [text, setText] = useState("")
  const [time, setTime] = useState({ minutes: "", seconds: "" })

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target

    if (name === "minutes" || name === "seconds") {
      if (!Number.isNaN(Number(value))) {
        setTime((time) => ({ ...time, [name]: value }))
      }
    } else {
      setText(value)
    }
  }

  const keyDownHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      const { minutes, seconds } = time

      if (
        text &&
        Number(minutes) >= 0 &&
        Number(minutes) < 60 &&
        Number(seconds) >= 0 &&
        Number(seconds) < 60
      ) {
        addTask(text, calculateTargetTime(Number(minutes), Number(seconds)))

        setText("")
        setTime({ minutes: "", seconds: "" })
      }
    }

    if (e.key === "Escape") {
      setText("")
      setTime({ minutes: "", seconds: "" })
      ;(e.target as HTMLInputElement).blur()
    }
  }

  const timeIsInvalid = (type: "minutes" | "seconds") => {
    const { [type]: value } = time
    return Number(value) > 59
  }

  return (
    <form className="new-todo-form">
      <input
        required
        name="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
      />
      <input
        name="minutes"
        className={`new-todo-form__timer${timeIsInvalid("minutes") ? " invalid" : ""}`}
        placeholder="Min"
        value={time.minutes}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
      />
      <input
        name="seconds"
        className={`new-todo-form__timer${timeIsInvalid("seconds") ? " invalid" : ""}`}
        placeholder="Sec"
        value={time.seconds}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
      />
    </form>
  )
}

export default NewTaskForm
