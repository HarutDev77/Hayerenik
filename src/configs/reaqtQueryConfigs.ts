import { toast } from "react-toastify"

export const defaultOptions = {
    queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        //cacheTime: 60 * 1000, // default cache time in milliseconds
        //staleTime: 5 * 60 * 1000, // default stale time in milliseconds

    },
    mutations: {
        onError: (error: any) => {
            // if (error.response.statusCode === 111) {
            //     message = 'Something went wrong!';
            // }
            toast(error?.message || 'Something went wrong!', {
                toastId: 'global-message',
                hideProgressBar: true,
                autoClose: 5000,
                style: {
                    backgroundColor: '#a10000',
                },
            })
        },
    },

}