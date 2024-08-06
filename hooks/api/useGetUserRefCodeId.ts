import { userService } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'

export default function useGetUserRefCodeId(keys: (string | number)[] = []) {
  return useQuery({
    queryKey: ['user-ref-code-id', ...keys],
    queryFn: userService.getRefCodeId,
  })
}

