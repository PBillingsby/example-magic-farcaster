import { LoginProps } from '@/utils/types'
import Header from '@/components/ui/Header'

import EmailOTP from './auth/EmailOTP';
import Farcaster from './auth/Farcaster';

const Login = ({ token, setToken }: LoginProps) => {
  return (
    <div className="login-page">
      <Header />
      <div className={`max-w-[100%] grid grid-cols-1 grid-flow-row auto-rows-fr gap-5 p-4 mt-8`}>

        <Farcaster token={token} setToken={setToken} />
        <EmailOTP token={token} setToken={setToken} />

      </div>
    </div>
  )
}

export default Login
