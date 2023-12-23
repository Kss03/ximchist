import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

import HomePage from '../../pages/HomePage/HomePage'
import ExamplesPage from '../../pages/ExamplesPage/ExamplesPage'
import AuthorizationPage from '../../pages/AuthorizationPage/AuthorizationPage'
import AddExamples from '../../pages/AddExamples/AddExamples'
import { Context } from '../../App'

import { ADD_NEW_ROUTE, AUTH_ROUTE, EXAMPLES_ROUTE, ROOT_ROUTE } from '../../utils/consts'

const AppRouter = () => {

  const {isAuthCont} = useContext(Context)

  const [isAuth, setIsAuth] = isAuthCont

  return (
      <Routes>
        
        <Route path={AUTH_ROUTE} key={AUTH_ROUTE} element={<AuthorizationPage/>}></Route>

        {isAuth && [
          <Route path={ROOT_ROUTE} key={ROOT_ROUTE} element={<HomePage/>}></Route>,
          <Route path={EXAMPLES_ROUTE} key={EXAMPLES_ROUTE} element={<ExamplesPage/>}></Route>,
          <Route path={ADD_NEW_ROUTE} key={ADD_NEW_ROUTE} element={<AddExamples />}></Route>,
        ]}

        <Route path="*" element={<Navigate to={AUTH_ROUTE} />}/>
        
      </Routes>
  )
}

export default AppRouter