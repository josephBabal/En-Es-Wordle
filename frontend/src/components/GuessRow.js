import styles from '../styles/GuessRow.module.css'
import { useAppStore } from '../stores/appStore';
export default function GuessRow({ guess, guessNumber, guessIdx }) {
  const { wordAnswer, theme, submitError} = useAppStore()
  const wordLength = 5;
  const guessBoxes = [];

  for (var i = 0; i < wordLength; i++) {
    const guessChar = guess[i];
    // console.log("==background color", backgroundColor)
    guessBoxes.push(
      <div 
        key={i} 
        id={
          guessNumber <= guessIdx ? 
          styles.black :
          wordAnswer[i] === guessChar ? 
          styles.green :
          wordAnswer.includes(guessChar) === true ? 
          styles.yellow : 
          theme == "dark" ? 
          styles.grey : 
          styles.lightgrey
        } 
        className={`
          ${styles.guessBox} 
          ${submitError && 
            guessNumber === guessIdx ? 
          `${styles.submitError} 
          ${styles.shakeRow}` : ""
          } 
          ${theme == "dark" ? 
            styles.dark : styles.light
          }
        `}

      > 
        <p> {guessChar} </p> 
      </div>
    )
  }
  
  // console.log("==guess row", guess)
  return (
    <div className={styles.guessRow} >
      {guessBoxes}
    </div>
  )
}