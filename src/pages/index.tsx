import MainLayout from "@/layouts";
import {ReactElement} from "react";
import Home from "@/components/pages/Home";

const HomePage = () =>{
    return (
        <Home/>
    )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
    return <MainLayout>{page}</MainLayout>
}
export default HomePage;