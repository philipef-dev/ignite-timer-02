import { Route, Routes } from 'react-router-dom'
// import { Home } from './pages/Home'
// import { History } from './pages/History'
import { DefaultLayout } from './layouts'
import { Home } from './components/Home.tsx'

export function Router() {
    return (
        <Routes>
            <Route path='/' element={<Home />}>
                {/* <Route path='/' element={<Home />} /> */}
                {/* <Route path='history' element={<History />} /> */}
            </Route>
        </Routes>
    )
}