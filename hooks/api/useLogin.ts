import { REFERRAL_KEY } from '@/constants/auth.constant'
import { setInitialized, setToken } from '@/lib/features/auth/auth-slice'
import { useAppDispatch } from '@/lib/hook'
import { userService } from '@/services/user.service'
import { ImportUserAuthRequest } from '@/types/user'
import { useMutation } from '@tanstack/react-query'

export default function useLogin() {
  const dispatch = useAppDispatch()

  const { mutate } = useMutation({
    mutationFn: (data: ImportUserAuthRequest) => userService.login(data),
    onSuccess: (data) => {
      dispatch(setToken(data.token))
      dispatch(setInitialized(true))
      localStorage.removeItem(REFERRAL_KEY)
    },
    onError: (e) => {
      console.error(e)
    },
  })

  return { login: mutate }
}

