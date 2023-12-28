import React, {FC} from "react";
import Footer from "@/components/Parts/Footer";
import AdminHeader from "@/components/Parts/AdminHeader";

interface LayoutProp {
    children: React.ReactNode
}

const AdminLayout: FC<LayoutProp> = ({children}) => {
    return (
        <div style={{minHeight:'100vh', display:'flex', flexDirection:'column'}}>
            <AdminHeader/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>

    )
}

export default AdminLayout;