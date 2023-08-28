import { Routes, Route } from 'react-router-dom'
import HomePage from './../pages/HomePage/HomePage'
import ChallengePage from '../pages/ChallengePage/ChallengePage'
import DojoPage from '../pages/DojoPage/DogoPage'
import CommunityPage from '../pages/CommunityPage/CommunityPage'
import NotFoundPage from './../pages/NotFoundPage/NotFoundPage'

const AppRoutes = () => {

    return (

        <Routes className="margin">

            <Route path={'/'} element={<HomePage />} />
            <Route path={'/challenges'} element={<ChallengePage />} />
            <Route path={'/dojo'} element={<DojoPage />} />
            <Route path={'/community'} element={<CommunityPage />} />

            <Route path={'*'} element={<NotFoundPage />} />

        </Routes>

    )
}

export default AppRoutes