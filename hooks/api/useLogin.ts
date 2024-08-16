import { REFERRAL_KEY } from '@/constants/auth.constant'
import { setInitialized, setToken } from '@/lib/features/auth/auth-slice'
import { useAppDispatch } from '@/lib/hook'
import { userService } from '@/services/user.service'
import { ImportUserAuthRequest } from '@/types/user'

export default function useLogin() {
  const dispatch = useAppDispatch()

  const handleLogin = async (payload: ImportUserAuthRequest) => {
    try {
      const result = await userService.login(payload)
      if (result.token) {
        dispatch(setToken(result.token))
        dispatch(setInitialized(true))
        localStorage.removeItem(REFERRAL_KEY)
      }

      return !!result.token
    } catch (e) {
      return false
    }
  }

  return { login: handleLogin }
}
