import React, { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner';



const Register = () => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    password2: ''
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState)
  const { name, email, password, password2 } = formData;

  // destructuring from auth state
  const { user, isLoading, isSuccess, message, isError } = useSelector(state => state.auth);


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

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password
      };

      dispatch(register(userData));
    }
  }


  return (isLoading ? <Spinner /> :
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please Create an Account</p>
      </section>


      <section className="form">
        <form onSubmit={submit}>

          <div className="form-group">
            <input type="text"
              className='form-control'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='Enter your name'
              required />
          </div>

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
            <input type="password"
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Please confirm your password'
              required />
          </div>

          <div className="form-group">
            <button type="submit" className='btn btn-block'>Register</button>
          </div>
        </form>
      </section>

    </>
  )
}

export default Register