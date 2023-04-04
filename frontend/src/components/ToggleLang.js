import { useState } from 'react'
import styles from '../styles/Navbar.module.css'


export default function ToggleLang({
  theme, 
  language, 
  handleLanguageChange,
  resetGame
}) {

  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(prev => !prev)
  }
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
    <div className={styles.changeContent} onClick={handleOpen}>
      {language == "es" ? renderEsFlag : renderEnFlag}
      <div
        onClick={() => { 
          resetGame()
          handleLanguageChange()
        }} className={`${styles.changeContent} ${isOpen ? styles.drop : styles.none}`}>
        <span className={theme == "dark" ? styles.dividerDark : styles.dividerLight}></span>
        {language == "es" ? renderEnFlag : renderEsFlag}
      </div>
    </div>
  )
}
