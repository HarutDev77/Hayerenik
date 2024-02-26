import { useState, useEffect } from 'react'

export const useDebounce = (value: any, delay: number) => {
   const [storedValue, setStoredValue] = useState<number | string>()

   useEffect(() => {
      const timeout = setTimeout(() => {
         setStoredValue(value)
      }, delay)

      return () => {
         clearTimeout(timeout)
      }
   }, [value])

   return storedValue
}
