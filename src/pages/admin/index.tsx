import WithAuth from "@/helpers/auth";

export async function getServerSideProps(context: any) {
    return WithAuth(context, true);
}

const Admin = () =>{
    return <h2>Admin page</h2>
}

export default Admin;