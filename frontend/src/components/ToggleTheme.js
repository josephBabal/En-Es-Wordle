import { useRef } from 'react'
import styles from '../styles/Navbar.module.css'
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { useAppStore } from '../stores/appStore'

export default function ToggleTheme({theme, language, handleThemeChange, themeRef}) {
 
  const { isOpenTheme, handleOpenTheme} = useAppStore()

  const renderEnDark = 
    <div className={styles.displayTheme}>
      <p> Dark </p>
      <MdOutlineDarkMode className={styles.themeIcon}/>
    </div>

  const renderEsDark = 
    <div className={styles.displayTheme}>
      <p> Oscuro </p>
      <MdOutlineDarkMode className={styles.themeIcon}/>
    </div>

    const renderEnLight = 
      <div className={styles.displayTheme}> 
        <p> Light </p>
        <MdOutlineLightMode className={styles.themeIcon}/>
      </div> 

    const renderEsLight = 
      <div className={styles.displayTheme}>
        <p> Claro </p>
        <MdOutlineLightMode className={styles.themeIcon}/>
      </div>

  return (
    <div className={styles.changeContent} onClick={handleOpenTheme} ref={themeRef}>
      {language == "es" ? theme == "dark" ? renderEsDark : renderEsLight : theme == "dark" ? renderEnDark : renderEnLight}
      <div onClick={handleThemeChange} className={`${styles.changeContent} ${isOpenTheme ? styles.drop : styles.none}`}>
        <span className={theme == "dark" ? styles.dividerDark : styles.dividerLight}></span>
        {language == "es" ? theme == "dark" ? renderEsLight : renderEsDark : theme == "dark" ?  renderEnLight : renderEnDark}
      </div>
    </div>
  )
}
