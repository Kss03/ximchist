import { HashRouter } from 'react-router-dom'
import { useContext, useState, useEffect, createContext } from 'react'

import MediaQuery from 'react-responsive'

import NavBars from './components/NavBar/NavBar'
import AppRouter from './components/AppRouter/AppRouter'
import { check } from './services/authRoutes'

export const Context = createContext(null)

function App() {

  const [user, setUser] = useState({})
  const [isAuth, setIsAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      setUser(data)
      setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div>
        <h1>Loaging...</h1>
      </div>
    )
  }

  return (
    <Context.Provider value={{userCont: [user, setUser], isAuthCont: [isAuth, setIsAuth]}}>

      <HashRouter >
        <div className=" bg-delicate g-0 row min-vh-100">
          {isAuth && <NavBars />}
          <MediaQuery minWidth={991.98} >
            <div className='col-lg-3 col-xl-2'></div>
          </MediaQuery>
          <div className=' col-12 col-lg-9 col-xl-10 z-1 mb-3 mt-3 mt-lg-0 pt-5'>
            <AppRouter/>
          </div>
        </div>
      </HashRouter>
    </Context.Provider>
  )
}

export default App
