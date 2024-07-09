import AuthForm from '@/components/AuthForm'
import { Metadata } from 'next'
export const metadata: Metadata={
  title:'Register'
}

const Register = () => {
  return (
    <div>
      <AuthForm type="register"/>
    </div>
  )
}

export default Register