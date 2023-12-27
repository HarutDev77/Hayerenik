import React, {FC} from "react";
import Footer from "@/components/Parts/Footer";
import AdminHeader from "@/components/Parts/AdminHeader";

interface LayoutProp {
    children: React.ReactNode
}

const AdminLayout: FC<LayoutProp> = ({children}) => {
    return (
        <>
            <AdminHeader/>
            <main>
                {children}
            </main>
            <Footer/>
        </>

    )
}

export default AdminLayout;