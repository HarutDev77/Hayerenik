export function debounce(func, timeout = 300) {
   let timer
   return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
         func.apply(this, args)
      }, timeout)
   }
}

export function getObjectFromEnum(enumParam: any): { [key: string]: string } {
   const result: { [key: string]: string } = {}
   Object.keys(enumParam).forEach((key) => {
      if (isNaN(Number(enumParam[key]))) {
         result[key] = enumParam[key]
      }
   })
   return result
}

export function getKeyByEnumValue(object, value) {
   return Object.keys(object).find((key) => object[key] == value)
}
