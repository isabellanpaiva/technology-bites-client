import { Routes, Route } from 'react-router-dom'
import HomePage from './../pages/HomePage/HomePage'
import ChallengePage from '../pages/ChallengePage/ChallengePage'
import DojoPage from '../pages/DojoPage/DogoPage'
import CommunityPage from '../pages/CommunityPage/CommunityPage'
import ProfilePage from '../pages/ProfilePage/ProfilePage'
import NotFoundPage from './../pages/NotFoundPage/NotFoundPage'

const AppRoutes = () => {

    return (

        <Routes className="AppRoutes">

            <Route path={'/'} element={<HomePage />} />
            <Route path={'/challenges'} element={<ChallengePage />} />
            <Route path={'/dojo'} element={<DojoPage />} />
            <Route path={'/community'} element={<CommunityPage />} />
            <Route path={'/profile/:user_id'} element={<ProfilePage />} />

            <Route path={'*'} element={<NotFoundPage />} />

            {/* add PrivateRoutes >>> */}

        </Routes>

    )
}

export default AppRoutes