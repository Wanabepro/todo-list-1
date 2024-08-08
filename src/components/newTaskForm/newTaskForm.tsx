import React, { useState } from "react"

import "./newTaskForm.css"
import calculateTargetTime from "../../helpers/calcuclateTargetTime"

import type { tasklist } from "types"

const NewTaskForm: React.FC<{ addTask: tasklist["addTask"] }> = ({ addTask }) => {
  const [text, setText] = useState("")
  const [time, setTime] = useState({ m: "", s: "" })

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target

    if (name === "m" || name === "s") {
      if (!Number.isNaN(Number(value))) {
        setTime((time) => ({ ...time, [name]: value }))
      }
    } else {
      setText(value)
    }
  }

  const keyDownHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      const { m, s } = time
      const minutes = Number(m)
      const seconds = Number(s)

      if (text && minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60) {
        addTask(text, calculateTargetTime(minutes, seconds))

        setText("")
        setTime({ m: "", s: "" })
      }
    }

    if (e.key === "Escape") {
      setText("")
      setTime({ m: "", s: "" })
      ;(e.target as HTMLInputElement).blur()
    }
  }

  const timeIsInvalid = (type: "m" | "s") => {
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
        name="m"
        className={`new-todo-form__timer${timeIsInvalid("m") ? " invalid" : ""}`}
        placeholder="Min"
        value={time.m}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
      />
      <input
        name="s"
        className={`new-todo-form__timer${timeIsInvalid("s") ? " invalid" : ""}`}
        placeholder="Sec"
        value={time.s}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
      />
    </form>
  )
}

export default NewTaskForm
