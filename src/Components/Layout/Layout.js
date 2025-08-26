import React, { useEffect, useRef } from 'react'
import styles from './layout.module.css'
import Head from 'next/head'
const Layout = ({ title, children }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>
                    {title ? `SocialBook | ${title}` : 'SocialBook'}
                </title>

                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"></meta>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    )
}

export default Layout