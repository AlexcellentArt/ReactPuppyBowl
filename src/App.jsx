import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* Okay lets divide the code up. 
    JSX:
    Form
    Tools
    Search
    Puppy Display: Name, Photo, Breed,
    Puppy Card: sole job is to render card data. I can have a function to call viewing that card in detail mode passed down to it by Puppy Display, with it being saved binded to that card's id.
    Puppy Nav Footer: Stretch Goal of saving old puppies and naving to them.
    JS Modules:
    FetchModule : I think the fetch functions from the last code can be safely isolated and broken off.
    RenderModule: I can likely isolate the render functions to either here or in Puppy Display. Then again, JSX more or less handles it live. So I might bve able to ditch entirely. Looking at it, renderAll can be the default card and the vars rerender themselves based on mode. That or bring in react-dom and render that way
    */}
    </>
  )
}

export default App
