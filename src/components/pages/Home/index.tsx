import SectionHeader from "@/components/pages/Home/SectionHeader";
import SectionBestsellers from "@/components/pages/Home/Bestsellers";
import SectionTopCategories from "@/components/pages/Home/TopCategories";
import SectionReviews from "@/components/pages/Home/Reviews";
const Home = () => {
    return (
        <>
            <SectionHeader/>
            <SectionBestsellers/>
            <SectionTopCategories/>
            <SectionReviews/>
        </>
    )
}

export default Home;