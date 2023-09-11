import React, { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'



const Login = () => {
  const initialState = {
    email: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialState)

  const { email, password } = formData;


  // set state base on input name
  const onChange = (e) => {
    // we pass the prev state so that prev fields or properties dont go away 
    // if we dont put prevState there will only be an object with one field everytime we fill an input
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }


  const submit = (e) => {
    e.preventDefault();


  }


  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please Login To Get Support</p>
      </section>


      <section className="form">
        <form onSubmit={submit}>

          <div className="form-group">
            <input type="email"
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your Email'
              required />
          </div>

          <div className="form-group">
            <input type="password"
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter your password'
              required />
          </div>

          <div className="form-group">
            <button type="submit" className='btn btn-block'>Login</button>
          </div>

        </form>
      </section>

    </>
  )
}

export default Login