import React, { useEffect, useState } from 'react'




export function useDebounce<T>(value: T, delay: number): T {
    
    const [debounceValue, setDebounceValue] = useState<T>(value);

    useEffect(() => {

        const delayFunc = setTimeout(() => {
            setDebounceValue(value)
        },delay)

        return () => {
            clearTimeout(delayFunc);
        }

    },[value, delay])




    return debounceValue;
    
}