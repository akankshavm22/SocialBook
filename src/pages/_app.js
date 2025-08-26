import '@/styles/globals.css'
import SplashScreen from '@/Components/SplashScreen/SplashScreen'
import { useEffect, useState } from 'react'
import Navbar from '@/Components/Navbar/Navbar'
export default function App({ Component, pageProps }) {
  const [showSplash, setShowSplash] = useState(true)
  useEffect(() => {
    setTimeout(() => setShowSplash(false), 1500);
  })
  return (<>
    {showSplash && <SplashScreen />}
    <Navbar />
    <Component {...pageProps} />
  </>)
}
