import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container'>
        <div className='flex justify-center mt-8'>
          <form>
            <input className='py-2 px-4 border border-collapse border-black rounded-l-lg' />
            <button className='py-2 px-4 border border-collapse border-black rounded-r-lg hover:bg-black hover:text-white active:bg-white active:text-black'>+</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
