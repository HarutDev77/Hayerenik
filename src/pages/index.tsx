import MainLayout from '@/layouts'
import { ReactElement } from 'react'
import Home from '@/components/pages/Home'
import { PAGINATION_LIMIT } from '@/constants'
import UserApi from '@/api/user.api'

export async function getServerSideProps() {
   const bestsellers = await UserApi.getBestsellers()
   // const categories = await UserApi.getCategories()

   return { props: { bestsellers } }
}

const HomePage = ({ bestsellers }) => {
   return <Home bestsellers={bestsellers} />
}

HomePage.getLayout = function getLayout(page: ReactElement) {
   return <MainLayout>{page}</MainLayout>
}
export default HomePage
