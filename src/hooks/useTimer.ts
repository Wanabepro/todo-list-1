import { useState, useEffect } from "react"

const useTimer = () => {
  const [currentTime, setCurrentTime] = useState(new Date().getTime())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().getTime())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return currentTime
}

export default useTimer
