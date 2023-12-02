import SectionHeader from "@/components/pages/Home/SectionHeader";
import SectionBestsellers from "@/components/pages/Home/Bestsellers";
import SectionTopCategories from "@/components/pages/Home/TopCategories";
import SectionReviews from "@/components/pages/Home/Reviews";
import SectionDifferentAges from "@/components/pages/Home/DifferentAges";
const Home = () => {
    return (
        <>
            <SectionHeader/>
            <SectionBestsellers/>
            <SectionTopCategories/>
            <SectionReviews/>
            <SectionDifferentAges/>
        </>
    )
}

export default Home;