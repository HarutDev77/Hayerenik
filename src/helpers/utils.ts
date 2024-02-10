export function debounce(func, timeout = 300) {
   let timer
   return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
         func.apply(this, args)
      }, timeout)
   }
}

export function getEnumKeyByValue<T>(value: string, enumObject: T): keyof T | undefined {
   const indexOfS = Object.values(enumObject).indexOf(value as unknown as T[keyof T]);

   if (indexOfS !== -1) {
      const key = Object.keys(enumObject)[indexOfS];

      return key as keyof T;
   }

   return undefined;
}
