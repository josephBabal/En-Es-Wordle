import { useState } from 'react'
import styles from '../styles/Navbar.module.css'
import { useAppStore } from '../stores/appStore'


export default function ToggleLang({
  theme, 
  language, 
  handleLanguageChange,
  resetGame,
  langRef
}) {

  const { isOpenLang, handleOpenLang} = useAppStore()

  const renderEsFlag =
    <div className={styles.displayLang}>
      <img className={styles.flag} src='./flags-img/es-flag.jpg' />
      <p> ES </p>
    </div>
    

  const renderEnFlag = 
    <div className={styles.displayLang}>
      <img className={styles.flag} src='./flags-img/us-flag.png' />
      <p> EN </p>
    </div>
    
  
  return (
    <div className={styles.changeContent} onClick={handleOpenLang} ref={langRef}>
      {language == "es" ? renderEsFlag : renderEnFlag}
      <div
        onClick={() => { 
          resetGame()
          handleLanguageChange()
        }} className={`${styles.changeContent} ${isOpenLang ? styles.drop : styles.none}`}>
        <span className={theme == "dark" ? styles.dividerDark : styles.dividerLight}></span>
        {language == "es" ? renderEnFlag : renderEsFlag}
      </div>
    </div>
  )
}
