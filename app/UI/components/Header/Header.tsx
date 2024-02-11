'use client'
import Link from "next/link";
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss'
import { signOut, useSession } from "next-auth/react";



function Header() {
    const pathname = usePathname()
    const { data } = useSession()

    return (
        <header className=" text-neutral-400 text-xl">
            <div className="flex max-w-7xl mx-auto justify-between px-4 py-6">
                <p>LOGO</p>
                <nav>
                    <ul className="flex gap-8">
                        <li className="relative"><Link className={pathname === '/' ? styles.activeLink : styles.link} href={'/'}>Movies</Link></li>
                        <li className="relative"><Link className={pathname === '/serials' ? styles.activeLink : styles.link} href={'/serials'}>TV shows</Link></li>
                        {!data && <ul className="flex gap-2">
                            <li className="relative"><Link className={pathname === '/login' ? styles.activeLink : styles.link} href={'/login'}>Login</Link></li>
                            <span className="block w-[1px] h-full bg-neutral-400"></span>
                            <li className="relative"><Link className={pathname === '/register' ? styles.activeLink : styles.link} href={'/register'}>Signup</Link></li>
                        </ul>}
                        {data && <li className="relative"><button className={styles.link} onClick={() => signOut({ redirect: false })}>Log out</button></li>}
                    </ul>
                </nav>
            </div>
        </header >
    );
}

export default Header;