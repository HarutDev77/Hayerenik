import { toast } from 'react-toastify'

export const defaultOptions = {
   queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      //cacheTime: 60 * 1000, // default cache time in milliseconds
      //staleTime: 5 * 60 * 1000, // default stale time in milliseconds
   },
   mutations: {
      onError: (error: any) => {
         toast(error?.message || 'Something went wrong!', {
            toastId: 'global-error-message',
            autoClose: 5000,
            type: 'error',
         })
      },
      onSettled: (success) => {
         if (success) {
            toast('Done', {
               toastId: 'global-success-message',
               autoClose: 5000,
               type: 'success',
            })
         }
      },
   },
}
