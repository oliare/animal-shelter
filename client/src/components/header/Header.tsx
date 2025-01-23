import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'
import { useEffect, useRef, useState } from 'react';

const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const location = useLocation();

    useEffect(() => {
        const handleClickOut = (e: MouseEvent) => {
            if (menuRef.current && buttonRef.current &&
                !menuRef.current.contains(e.target as Node) &&
                !buttonRef.current.contains(e.target as Node)
            ) { setMenuOpen(false); }
        };

        document.addEventListener('mousedown', handleClickOut);
        return () => document.removeEventListener('mousedown', handleClickOut);
    }, []);

    const isHomePage = location.pathname === '/';
    const headerClass = `${styles.header} ${menuOpen ? styles.menuOpenHeader : ''} ${isHomePage ? '' : styles.otherHeader}`;
    const linkClass = isHomePage ? styles.homeLink : styles.otherLink;

    return (
        <>
            <header className={headerClass}>
                <nav className="px-4 lg:px-6 py-2.5">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <div className="flex items-center">
                            <Link to={'/'}><img src="/images/logo.png" className={`${styles['logo']} mr-3 h-6 sm:h-9`} alt="C&D Logo" /></Link>
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">C&D's</span>
                        </div>
                        <div className="flex items-center lg:order-2">
                            <Link to="#" className={`${styles['btn-login']} px-4 py-2`}>Log in</Link>
                            <Link to="#" className={`${styles['btn-register']} px-4 py-2`}>Register</Link>
                            <button
                                ref={buttonRef}
                                onClick={() => setMenuOpen(!menuOpen)}
                                type="button"
                                className="p-2 text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden"
                                aria-expanded={menuOpen}>

                                <span className="sr-only">Open main menu</span>
                                {menuOpen ? (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"></path>
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                            clipRule="evenodd"></path>
                                    </svg>
                                )}
                            </button>
                        </div>

                        <div ref={menuRef} className={`${menuOpen ? styles['menuOpen'] : 'hidden'} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}>
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li> <Link to="/" onClick={() => setMenuOpen(false)}
                                    className={linkClass}>Home</Link>
                                </li>
                                <li> <Link to="/about-us" onClick={() => setMenuOpen(false)}
                                    className={linkClass}>About us</Link>
                                </li>
                                <li> <Link to="/create-animal" onClick={() => setMenuOpen(false)}
                                    className={linkClass}>Add animal</Link>
                                </li>
                                <li> <Link to="/adopt" onClick={() => setMenuOpen(false)}
                                    className={linkClass}>Adopt</Link>
                                </li>
                                <li> <Link to="#" onClick={() => setMenuOpen(false)}
                                    className={linkClass}>How to help</Link>
                                </li>
                                <li> <Link to="#" onClick={() => setMenuOpen(false)}
                                    className={linkClass}>Adopted animals</Link>
                                </li>
                                <li> <Link to="#" onClick={() => setMenuOpen(false)}
                                    className={linkClass}>Contact</Link>
                                </li>
                            </ul>

                        </div>

                    </div>
                </nav>
            </header>

            <script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></script>
        </>
    )
}
export default Header