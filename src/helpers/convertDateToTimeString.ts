import { format } from "date-fns"

function convertDateToTimeString(seconds: number | Date) {
  let time = seconds
  if (typeof time !== "number") {
    time = time.getTime()
  }
  if (time < 1000) return "00:00"

  if (time < 60 * 60 * 1000) {
    return format(time, "mm:ss")
  }

  return format(time, "hh:mm:ss")
}

export default convertDateToTimeString
