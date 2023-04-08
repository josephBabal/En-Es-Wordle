import { useState} from 'react'
import styles from '../styles/Navbar.module.css'
import { IoSettingsSharp } from "react-icons/io5";
import ToggleLang from './ToggleLang';
import ToggleTheme from './ToggleTheme';
import { useAppStore } from '../stores/appStore';

export default function Navbar({resetGame, themeRef, langRef}) {
  const { 
    theme, 
    language, 
    handleLanguageChange, 
    handleThemeChange,
    handleInstruction,
    setOverlay
  } = useAppStore()
  return (
    <div className={styles.navContainer}>
      <div 
        className={`${theme == "dark" ?
          styles.containerDark : 
          styles.containerLight}
          ${styles.changeContainer}
        `}
      >
        <ToggleLang
          theme={theme} 
          language={language} 
          handleLanguageChange={handleLanguageChange}
          resetGame={resetGame}
          langRef={langRef}
        />
      </div>

      <div className={styles.userButtonContainer}>
        <div 
          className={`
            ${styles.helpButton} 
            ${theme == "dark" ? 
            styles.containerDark : styles.containerLight}
          `}
          onClick={() => {
            setOverlay(true)
            handleInstruction()
          }}
        > 
          {language == "es" ? <p> Ayuda </p> : <p> Help </p>} 
        </div>
      
        <div className={`${styles.changeTheme} ${theme == "dark" ? styles.containerDark : styles.containerLight}`}>
          <ToggleTheme 
            theme={theme} 
            language={language} 
            handleThemeChange={handleThemeChange}
            themeRef={themeRef}
          />
        </div>
        {/* <button className={`${styles.settingButton} ${theme == "dark" ? styles.settingDark : styles.settingLight}`} > <IoSettingsSharp /> </button> */}
      </div>
    </div>
  )
}
