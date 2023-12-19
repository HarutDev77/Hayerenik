import WithAuth from "@/helpers/auth";

export async function getServerSideProps(context: any) {
    return WithAuth(context, true)
}