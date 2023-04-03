import { useState, useContext } from 'react'
import styles from '../styles/OpenCard.module.css'
import { ThemeContext, LanguageContext } from '../pages/_app'
import Instructions from './Instructions'
import { IoCloseOutline } from "react-icons/io5"
import { useAppStore } from '../stores/appStore'

export default function OpenCard({handleOpenCard}) {
  const {
    theme, 
    language, 
    setLanguage, 
  } = useAppStore()
  const [isSelected, setIsSelected] = useState("")
  const handleSelect = (selection) => {
    const option = selection
    setIsSelected(option)
  }
  return (
    <div 
      className={`
      ${styles.cardContainer}
      ${theme == "dark" ? styles.dark : styles.light}
      `}>
      {language !== "" &&
        <IoCloseOutline 
          className={styles.closeIcon} 
          onClick={handleOpenCard}
        /> 
      }
      <p className={styles.title}> En & Es Wordle </p>

      <div className={styles.selectText}>
        <div> Select Language </div>
        <div> Seleccionar Idioma </div>
      </div>
      
      <div className={styles.selectOptions}>
        <div 
          onClick={() => {
            setLanguage("en")
            handleSelect("en")
          }}
          className={`
            ${styles.enSide}
            ${theme == "dark" ? styles.enSideDark : styles.enSideLight}
            ${isSelected == "en" && theme == "dark" ? 
              styles.selectedDark : 
              isSelected == "en" && theme == "light" ?
              styles.selectedLight : ""
            }  
          `} 
        >
          English
        </div>

        <div 
          onClick={() => {
            setLanguage("es")
            handleSelect("es")
          }}
          className={`
            ${styles.spanSide}
            ${theme == "dark" ? styles.spanSideDark : styles.spanSideLight}
            ${isSelected == "es" && theme == "dark" ? 
              styles.selectedDark : 
              isSelected == "es" && theme == "light" ?
              styles.selectedLight : ""
            }  
          `}  
        > 
          Español
        </div>
      </div>

      <div>
        {language !== "" && 
          <Instructions />
        }
      </div>
      {language !== "" && 
        <button 
          className={
            theme == "dark" ? 
            styles.playDark : styles.playLight
          }  
          onClick={handleOpenCard}
        >
        {language == "es" ? <p> Jugar </p>: <p> Play </p>} 
      </button>}
    </div>
  )
}
