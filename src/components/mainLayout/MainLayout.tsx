import { Outlet } from 'react-router-dom';
import { Navbar } from '../navbar/Navbar';
import { SideMenu } from '../sideMenu/SideMenu';
import styles from './mainLayout.module.scss';
import MainLayoutProps from './MainLayoutProps'

export const MainLayout = (mainLayoutProps: MainLayoutProps) => {

    return <main className={`h-screen w-screen ${styles.__layout} gap-4 md:gap-12`}>
        <Navbar></Navbar>
        <div className={`${styles.__layout__container} container m-auto `}>
            <div className={`${styles.__layout__content}`}>
                <Outlet />
            </div>
        </div>
    </main>
}