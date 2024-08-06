import { userService } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'

export default function useGetUserTotalRef(keys: (string | number)[] = []) {
  return useQuery({
    queryKey: ['user-total-ref', ...keys],
    queryFn: userService.getTotalRef,
  })
}

