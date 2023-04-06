import styles from '../styles/Keyboard.module.css'
import { useEffect} from 'react'
import { useAppStore } from '../stores/appStore'
export default function Keyboard({
  curGuess, 
  handleClick, 
  submitGuess, 
  handleDelete, 
  oldGuesses, 
  handleKeyDown, 
}) {
  const { wordAnswer, language, theme, overlay } = useAppStore()
  const topRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
  const middleRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
  const bottomRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

  useEffect(() => {
    if (overlay == false) window.addEventListener("keydown", handleKeyDown);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [curGuess, overlay]);

  const renderRow = (row) => {
    return (
      <div className={styles.row}>
        {row.map(letter => {
          let background = "transparent"
          // tracker to see if letter has been found in prev guesses
          let found = false;
          let foundInCorrectPosition = false;
          for (let i = 0; i < oldGuesses.length; i++) {
            const guess = oldGuesses[i];
            for (let j = 0; j < guess.length; j++) {
              if (letter === guess[j]) {
                found = true;
                if (j === wordAnswer.indexOf(letter)) {
                  foundInCorrectPosition = true;
                }
              }
            }
          }
          if (found && wordAnswer.includes(letter)) {
            if (foundInCorrectPosition) {
              background = "green";
            } else {
              background = "yellow";
            }
          } 
          else if (!found) {
            background = "grey"
          }
        
          return (
            <button 
              className={`
                ${styles.letter}
                ${theme == "dark" ? 
                styles.dark : styles.light} 
              `} 
              value={letter} 
              onClick={handleClick} 
              key={letter} 
              id={
                background === "green" ? 
                styles.green : 
                background === "yellow" ? 
                styles.yellow : 
                background === "transparent" 
                && theme == "dark" ? 
                styles.darkGrey : 
                background === "transparent" 
                && theme == "light" ? 
                styles.lightGrey : 
                background ==="grey" 
                && theme == "dark" ? 
                styles.darkTransparent :
                styles.lightTransparent }
            > 
              <p style={{ userSelect: "none" }}> {letter}  </p>
            </button>
        )})}
      </div>
    )
  }
  

  return (
    <form className={styles.boardContainer} onSubmit={submitGuess} >
      <div className={styles.topRow}>
        {renderRow(topRow)}
      </div>
      <div className={styles.middleRow} >
        {renderRow(middleRow)}
      </div>
      <div className={styles.bottomRow} >
        <button 
          className={`
            ${styles.special}
            ${theme == "dark" ? 
            styles.specialDark : styles.specialLight}
          `}  
          value={'Enter'} 
          onClick={submitGuess} 
          key={'Enter'} 
        > 
          {language == "en" ? <p> Enter </p> : <p> Enivar </p>}
        </button> 
        <div>{renderRow(bottomRow)} </div>
        <button 
          className={`
            ${styles.special}
            ${theme == "dark" ? 
            styles.specialDark : styles.specialLight}
          `} 
          value={'Delete'} 
          onClick={handleDelete} 
          key={'Delete'} 
        > 
          {language == "en" ? <p> Delete </p> :  <p> Borrar </p> }
        </button>
      </div>
    </form>
  )
}