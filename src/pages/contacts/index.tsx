import MainLayout from "@/layouts";
import {ReactElement} from "react";
import ContactsPage from "@/components/pages/Contacts";


const Contact = () =>{
    return (
        <ContactsPage />
    )
}

Contact.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>
}
export default Contact;