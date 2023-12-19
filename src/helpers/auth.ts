import { getCookie } from "cookies-next";

const WithAuth = async (context: any, blockWhenLoggedIn: boolean = false) => {
    const { req, res } = context;

    const token = getCookie('token', {
        req,
        res,
        httpOnly: false,
        secure: true,
        sameSite: 'none'
    });



    if (!token) {
        return {
            redirect: {
                destination: 'admin/login',
                permanent: false,
            },
        };
    }



    return {
        props: {},
    };
};

export default WithAuth;