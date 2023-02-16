import './App.css'
import useInput from "./hooks/useInput";
import React from "react";
import {authCheck, login} from "./utils/api";

function App() {
  const [email, onEmailChangeHandler] = useInput('')
  const [password, onPasswordChangeHandler] = useInput('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault()

      const response = await login({email, password})

      console.log(response)
  }

  async function handleCheck() {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoidGl2ZWNzMDlAZ21haWwuY29tIiwiaWF0IjoxNjc2NTQ5MDA4LCJleHAiOjE2NzY2MzU0MDh9.dzJjvpuNzPz9h-H5v6IwMdyg74OKE3oQ2Ryy-5R_SQo"
      const response = await authCheck(token);
  }

  return (
      <>
          <form className="App" onSubmit={handleSubmit}>

              <div>
                  <label>Email</label>
                  <input id='input-email' name='email' type='email' onChange={onEmailChangeHandler} />
              </div>

              <div>
                  <label>Password</label>
                  <input id='input-password' name='password' type='password' onChange={onPasswordChangeHandler} />
              </div>

              <button type='submit'>Login</button>

          </form>

          <button onClick={handleCheck}>Check</button>
      </>
  )
}

export default App
