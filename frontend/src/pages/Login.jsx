import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner';



const Login = () => {
  const initialState = {
    email: '',
    password: '',
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState)

  const { email, password } = formData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);


  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // redirect when loged in
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch])


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
    const userData = {
      email,
      password
    };

    dispatch(login(userData));
  }


  return (isLoading ? <Spinner /> :
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