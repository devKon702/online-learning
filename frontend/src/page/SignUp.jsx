import React, { useState } from 'react'
import { fetchDataWithoutAccessToken, showToastError } from '../global'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function SignUp() {
  let isShowPassword = false
  

  const navigate = useNavigate()

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [isRemember, setIsRemember] = useState()


  function handleChangeView() {   
    const elPassword = document.getElementById('password')
    const elViewPassword = document.getElementById('view-password')
    if (isShowPassword) { 
      elPassword.type = 'password'
      elViewPassword.src = '/hide.png'
      
    }
    else {
      elPassword.type = 'text'
      elViewPassword.src = '/view.png'
    }
    isShowPassword = !isShowPassword

  }

  async function postSignUp(email, password, isRemember) {
    const subUrl = '/auth/sign-up'
    const body = { email, password, isRemember }
    try { 
      const response = await fetchDataWithoutAccessToken(subUrl, 'POST', body)
      const auth = response.data
      localStorage.setItem('accessToken', auth.accessToken)
      localStorage.setItem('isAuthenticated', true)
      localStorage.setItem('email', auth.user.email)
      localStorage.setItem('roles', JSON.stringify(auth.user.roles))
      navigate('/')
    }
    catch(error) { 
      showToastError(error.message)

    }
  }
  function handleSignUp(event) {
    event.preventDefault()
    postSignUp(email, password, isRemember)
  }


  return (<div className="flex justify-center items-center h-screen">
  {/* Left: Image */}
  <div className="w-1/2 hidden lg:block h-screen">
    <img
      src="/touann-gatouillat-vergos-dSBJv66Yjlk-unsplash.jpg"
      alt="login image"
      className="object-cover w-full h-full"
    />
  </div>
  {/* Right: Login Form */}
  <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
    <h1 className="text-2xl font-semibold mb-4">Đăng ký</h1>
    <form onSubmit={handleSignUp}>
      {/* Email Input */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-600">
          Email
        </label>
        <input
          onChange={e => setEmail(e.target.value)}
          type="email"
          className="mt-2 w-full rounded-md py-2 px-3"
          required
        />
      </div>
      {/* Password Input */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-600 mb-2">
          Password
        </label>
        <div className='relative'>
          <input
            onChange={e => setPassword(e.target.value)}
            id='password'
            type="password"
            className="w-full borde rounded-md py-2 px-3"
            required
          />
          <img onClick={handleChangeView} id='view-password' src="/hide.png" className='cursor-pointer absolute top-1/2 right-4' style={{transform: 'translateY(-50%)'}} alt="" />
        </div>
        
      </div>
      {/* Remember Me Checkbox */}
      <div className="mb-4 flex items-center">
        <input
          onChange={e => setIsRemember(e.target.value)}
          type="checkbox"
          className="text-blue-500"
          
        />
        <label htmlFor="remember" className="text-gray-600 ml-2">
          Nhớ tài khoản
        </label>
      </div>
      {/* Forgot Password Link */}
      <div className="mb-6 text-blue-500">
        <Link to={'/forgot-password'} className="hover:underline">
          Quên mật khẩu
        </Link>
      </div>
      {/* Login Button */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
      >
        Đăng Ký
      </button>
    </form>
    {/* Sign up  Link */}
    <div className="mt-6 text-blue-500 text-center">
      <Link to={'/sign-in'} className="hover:underline">
        Đăng nhập
      </Link>
    </div>
  </div>
  <ToastContainer/>
</div>)

}
export default SignUp
