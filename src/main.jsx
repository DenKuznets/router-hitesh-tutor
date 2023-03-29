import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home/>
  </React.StrictMode>,
)

// в этом туториале функциональные компоненты не выносятся по разным файлам, для простоты понимания роутера. В нормальном проекте это были бы отдельные компоненты
function Home() {
  return (
    <div>
      <h1> Home route</h1>
     </div>
   )
}