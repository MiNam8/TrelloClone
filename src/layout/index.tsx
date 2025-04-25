import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
const Layout = () => {
    return (
        <div className="pl-[250px] w-full h-screen overflow-y-auto">
            <Sidebar />
            <Navbar />
            <div className="pr-[20px] pt-[70px] w-full h-full overflow-y-auto">
                <div className="overflow-x-auto pb-10">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout
