import { useState } from 'react';
import styles from './navbar.module.scss';
import NavbarProps from './NavbarProps'
import { ShoppingCardSlide } from '../shoppingCardSlide/ShoppingCardSlide';
import { Link, useLocation } from 'react-router-dom';

const Pages = [
    {
        id: 'home',
        path: '/',
        title: 'Home'
    },
    {
        id: 'products',
        path: '/products',
        title: 'Products'
    }
]

export const Navbar = (navbarProps: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isMobilMenuOpen, setIsMobilMenuOpen] = useState(false)
    const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const toggleMobilMenu = () => setIsMobilMenuOpen(!isMobilMenuOpen)
    const toggleSlideOver = () => {
        setIsSlideOverOpen(!isSlideOverOpen);
    };

    return <div className={`${styles.__navbar} `}>
        <ShoppingCardSlide isOpen={isSlideOverOpen} togglePanel={toggleSlideOver} />
        <nav className=" border-b-2 border-b-gray-500">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                        <button
                            onClick={() => { toggleMobilMenu() }}
                            type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>

                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">

                                {Pages.map(page => {
                                    return <Link key={`link-${page.id}`} to={page.path} className={`
                                    ${(`/${location.pathname.split('/')[1] ?? ''}`) === page.path ? 'bg-gray-900 text-white' : ''}
                                    hover:bg-gray-700 hover:text-white
                                    rounded-md px-3 py-2 text-sm font-semibold`}
                                        aria-current="page">{page.title}</Link>
                                })}

                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button onClick={() => { toggleSlideOver() }} type="button"
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 h-8 w-8 p-2
                         hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5"></span>
                            <span className="sr-only">View notifications</span>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                fill='white'
                                viewBox="0 0 576 512">
                                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
                        </button>

                        <div className="relative ml-3">
                            <div>
                                <button type="button"
                                    onClick={() => { toggleMenu() }}
                                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span className="absolute -inset-1.5"></span>
                                    <span className="sr-only">Open user menu</span>
                                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                </button>
                            </div>


                            <div className={`${isMenuOpen ? 'block' : 'hidden'} absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                                <Link to="/signout" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-2">Sign out</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${isMobilMenuOpen ? 'block' : 'hidden'} z-10 relative bg-gray-900`} id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {Pages.map(page => {
                        return <Link key={`link-${page.id}`} to={page.path} className={`
                                    ${(`/${location.pathname.split('/')[1] ?? ''}`) === page.path ? 'bg-gray-900 text-white' : ''}
                                    text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium`}
                            aria-current="page">{page.title}</Link>
                    })}
                </div>
            </div>
        </nav>
    </div>
}