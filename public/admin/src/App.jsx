import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useState } from 'react'

import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import HomePage from './pages/HomePage/HomePage'
import ExamplesPage from './pages/ExamplesPage/ExamplesPage'
import AddExamples from './pages/ExamplesPage/AddExamples/AddExamples'

function App() {

  return (
    <BrowserRouter >
      <div className='position-fixed vw-100 z-3'>
          <Header/>
      </div>
      <div className='position-fixed vw-100 vh-100 pt-5'>
        <div className='position-absolute w-100 h-100 row g-0'>
          <div className='col-3 col-xl-2 h-100'><Sidebar /></div>
        </div>
      </div>
      <div className=" bg-delicate g-0 row pt-5 min-vh-100">
        <div className='col-3 col-xl-2'></div>
        <div className='col-9 col-xl-10 z-1 mb-3'>
          <Routes>
            <Route path='/'>
              <Route index element={<HomePage/>}></Route>
              <Route path='examples' >
                <Route index element={<ExamplesPage/>}></Route>
                <Route path='addNew' element={<AddExamples />}></Route>
              </Route>

            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
