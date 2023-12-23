import { Form } from "react-bootstrap"
import { useRef, useState, useContext } from "react";

import { Context } from '../../App'
import { login } from "../../services/authRoutes";


const AuthorizationPage = () => {

  const {userCont, isAuthCont} = useContext(Context)

  const [user, setUser] = userCont
  const [isAuth, setIsAuth] = isAuthCont

  const [errmsg, setErmsg] = useState('');

  const loginRef = useRef()
  const passwordRef = useRef()

  const onLogin = async (e) => {
    e.preventDefault();
    console.log(loginRef.current.value, passwordRef.current.value)
    const formData = new FormData(); 
    
    formData.append("username", loginRef.current.value)
    formData.append("password", passwordRef.current.value)
    
    try {
      const {role, username} = await login(formData)
      console.log(role, username)
      setUser(username)
      setIsAuth(true)
      console.log(isAuth)
      setErmsg('Success')
      setTimeout(() => {
        setErmsg('')
      }, 3000)
    } catch(e) {
      console.log(e.response.data.message)
      setErmsg(`${e.response.data.message}`)
    }
  }

  return(
    <div className="auth-page h-100">
      <div className="container-fluid h-100">

        <div className="row pt-4 justify-content-center h-100 align-items-lg-center">
          <div className="col-12 col-lg-4">
            <div className="rounded-4 bg-white px-5 py-4">
              <Form onSubmit={(e) => onLogin(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Login</Form.Label>
                  <Form.Control type="text" placeholder="Enter login" name="username" ref={loginRef}/>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password" ref={passwordRef}/>
                </Form.Group>
                <button className="btn btn-regular w-100" type="submit">
                  Submit
                </button>
              </Form>
              <p className="py-2 px-3 m-0 text-danger text-center">{errmsg}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorizationPage