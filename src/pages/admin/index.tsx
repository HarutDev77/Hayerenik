import WithAuth from "@/helpers/auth";
import {ReactElement} from "react";
import AdminLayout from "@/layouts/AdminLayout";

export async function getServerSideProps(context: any) {
    return WithAuth(context, true);
}

const Admin = () =>{
    return <h2>Admin page</h2>
}

Admin.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>
}

export default Admin;