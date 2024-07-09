'use client'

import { EmailOutlined, PersonOutline, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // console.log(data)
    let res;
    if (type == 'register') {
      res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(data),
      });

      if(res.ok){
        router.push('/login');
      }else{
        toast.error("Something went wrong")
      }
    }
  }

  // check space before and after string validation
  const checkSpace = (str: any) => {
    const regex = /^\s+|\s+$/
    return regex.test(str)
  }

  //check password 
  const validatePassword = (str: any) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,20}$/
    return regex.test(str)
  }


  return (
    <div className='auth'>
      <div className='overlay'>
        <div className="content">
          <Link href={'/'}>
            <img src="/assets/logo.png" alt="logo" className='logo' />
          </Link>

          <form className='form' onSubmit={handleSubmit(onSubmit)}>
            {/* REGISTER */}
            {type === "register" && (
              <>
                {/* Username */}
                <div className='input'>
                  <input type="text"
                    {...register("username", {
                      required: "Username is required",
                      minLength: {
                        value: 2,
                        message: "Username must be at least 2 characters"
                      },
                      validate: (value?: string) => {
                        if (checkSpace(value)) {
                          return "Username must be no space before and after string";
                        }
                        return true;
                      },
                    })}
                    placeholder='Username'
                    className='input-field'
                  />
                  <PersonOutline sx={{ color: "white" }} />
                </div>
                <p className='error'>{errors.username?.message}</p>
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
            <p className='error'>{errors.email?.message}</p>

            {/* Password */}
            <div className='input'>
              <input type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  validate: (value?: string) => {
                    if (!validatePassword(value)) {
                      return "Password must be between 8 and 20 character with at least one number, one uppercase and one special";
                    }
                    return true
                  },
                  // validate:(value?: string)=>{
                  //   if(checkPassword(value)){
                  //     return "Password must be between 5 and 20 character with at least one special";
                  //   }
                  //   return true,
                  // },
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
            <p className='error'>{errors.password?.message}</p>

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