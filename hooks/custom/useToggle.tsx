import { useCallback, useState } from 'react'

import type { Dispatch, SetStateAction } from 'react'

export function useToggle(defaultValue?: boolean): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
  const [value, setValue] = useState(defaultValue || false)
  const toggle = useCallback(() => setValue((v) => !v), [])
  return [value, toggle, setValue] as const
}

