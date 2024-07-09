import AuthForm from '@/components/AuthForm'
import { Metadata } from 'next'

export const metadata: Metadata={
  title: "Login"
}
const Login = () => {
  return (
    <div>
      <AuthForm type="login"/>
    </div>
  )
}

export default Login