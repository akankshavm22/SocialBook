import React, { useEffect, useState } from 'react'
import styles from "./navbar.module.css"
import Link from 'next/link'
const Navbar = () => {
    const [user, setUser] = useState(true);
    useEffect(() => {
        const userExist = JSON.parse(localStorage.getItem('User'))
        if (userExist) {
            setUser(true)
        } else {
            setUser(false)
        }
    }, [])
    return (
        <div className={styles.nav}>
            <div className={styles.inner}>
                <Link href="/" className={styles.links}>Home</Link>
                <Link href="/search" className={styles.links}>Search</Link>
                {!user && <>
                    <Link href="/Auth/Login" className={styles.links}>Login</Link>
                    <Link href="/Auth/Signup" className={styles.links}>Signup</Link>
                </>
                }
                {user &&
                    <>
                        <Link href="/profile" className={styles.links}>Profile</Link>
                        <Link href="/notifications" className={styles.links}>Notifications</Link>

                        <Link href="/Auth/Login"
                            onClick={() => {
                                localStorage.removeItem("User")
                            }}
                            className={styles.links}>Logout</Link>
                    </>
                }
            </div>

        </div>
    )
}

export default Navbar