import { useEffect } from 'react'
import styles from '../styles/NewGameCard.module.css'
import { useAppStore } from '../stores/appStore'

export default function NewGameCard({ resetGame }) {
  const { 
    isSolved, 
    wordAnswer, 
    theme, 
    language,
    setOverlay,
  } = useAppStore()

  useEffect(() => {
    setOverlay(true)
  }, [])
  return (
    <div 
      className={`
        ${styles.cardContainer}
        ${theme == "dark" ? 
          styles.darkContainer : 
          styles.lightContainer
        }  
      `}
    >
      {isSolved ? 
        <div 
          className={`
            ${theme == "dark" ? 
            styles.wonDark :
            styles.wonLight}
          `}
        > 
          {language == "en" ? <p> You won! </p> :
            <p> Ganaste! </p>
          }
        </div>
        : 
        <div 
          className={`
          ${theme == "dark" ? 
          styles.lostDark :
          styles.lostLight}
          `}
        > 
          {language == "en" ? <p> You lost! </p> :
            <p> Perdiste! </p>
          } 
        </div>  
      }
      <div className={styles.answer}> 
        {language == "en" ? <p> The answer was </p> : <p> La respuesta es </p>} {wordAnswer.toLowerCase()}! </div>
      <button 
        className={`
          ${styles.resetButton} 
          ${theme == "dark" ? 
          styles.darkButton : styles.lightButton}
        `} 
        onClick={() => {
          resetGame()
          setOverlay(false)
        }}
        > 
          {language == "en" ? <p> New Game </p> : <p> Nuevo Juego </p>}
        </button>
    </div>
  )
}
