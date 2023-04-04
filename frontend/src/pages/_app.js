import { useEffect } from "react";
import '../styles/globals.css'
import { useAppStore } from "../stores/appStore";

function MyApp({ Component, pageProps }) {
  const { theme } = useAppStore()

  useEffect(() => {
    document.body.className = theme; // set the className of body element to theme
  }, [theme])

  return ( 
    <Component {...pageProps} />
  )
}

export default MyApp
