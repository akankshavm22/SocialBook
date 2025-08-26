import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/Components/Layout/Layout'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  return (
    <Layout>
      <div className={styles.cont}>
        <div className={styles.left}>
          <h1 className={styles.title}>SocialBook</h1>
        </div>
        <div className={styles.right}>
          A college social network is an online platform designed for students of a particular college or university to connect and communicate with each other. These social networks provide an easy way for students to share information, discuss topics, and collaborate on projects with their peers and professors.
          <Link href="Auth/Signup" className={styles.link}>Get Started</Link>
        </div>
      </div>
    </Layout>
  )
}
