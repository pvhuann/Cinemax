'use client'

import { EmailOutlined, PersonOutline, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  username?: string
  email: string
  password: string
}

const AuthForm = ({ type }: { type: "register" | "login" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues:
      type === "register"
        ? { username: "", email: "", password: "" }
        : { email: "", password: "" },
  })

  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='auth'>
      <div className='overlay'>
        <div className="content">
          <Link href={'/'}>
            <img src="/assets/logo.png" alt="logo" className='logo' />
          </Link>

          <form className='form'>
            {/* REGISTER */}
            {type === "register" && (
              <>
                {/* Username */}
                <div className='input'>
                  <input type="text"
                    {...register("username", {
                      required: "Username is required",
                    })}
                    placeholder='Username'
                    className='input-field'
                  />
                  <PersonOutline sx={{ color: "white" }} />
                </div>
                {errors.username && (
                  <p className='error'>{errors.username.message}</p>
                )}
              </>
            )}

            {/* Email */}
            <div className='input'>
              <input type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                placeholder='Email'
                className='input-field'
              />
              <EmailOutlined sx={{ color: "white" }} />
            </div>
            {errors.email && (
              <p className='error'>{errors.email.message}</p>
            )}

            {/* Password */}
            <div className='input'>
              <input type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                })}
                placeholder='Password'
                className='input-field'
              />
              {/* <VisibilityOffOutlined className='cursor-pointer' sx={{ color: "white" }} onClick={()=> setShowPassword(!showPassword)}/> */}
              {showPassword
                ? (
                  <VisibilityOutlined className='cursor-pointer' sx={{ color: "white" }}
                    onClick={() => setShowPassword(!showPassword)} />)
                : (<VisibilityOffOutlined className='cursor-pointer' sx={{ color: "white" }}
                    onClick={() => setShowPassword(!showPassword)} />
                )}
            </div>
            {errors.password && (
              <p className='error'>{errors.password.message}</p>
            )}

            <button type='submit' className='button'>
              {
                type === 'register' ? "Join free" : "Let's Watch"
              }
            </button>


          </form>

          {
            type === 'register'
              ? (
                <Link href={"login"}>
                  <p className="link">Already have an account? Log In Here</p>
                </Link>)
              : (
                <Link href={"register"}>
                  <p className="link">Don't have an account? Register Here</p>
                </Link>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default AuthForm