import { format } from "date-fns"

function convertDateToTimeString(time: number) {
  if (time < 1000) return "00:00"

  if (time < 60 * 60 * 1000) {
    return format(time, "mm:ss")
  }

  return format(time, "hh:mm:ss")
}

export default convertDateToTimeString
