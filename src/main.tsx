import React from "react"
import ReactDOM from "react-dom/client"

import App from "./components/app"

import "./index.css"

const root = ReactDOM.createRoot(document.querySelector(".todoapp")!)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
