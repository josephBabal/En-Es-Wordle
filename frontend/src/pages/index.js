
import styles from '../styles/Home.module.css'
import {useState, useEffect, useContext } from 'react'
// import axios from 'axios'
import enWordData from '../data/data.json'
import { spanWordData } from '../data/spanishData'
import GuessRow from '../components/GuessRow'
import NewGameCard from '../components/NewGameCard'
import Keyboard from '../components/Keyboard'
// import { ThemeContext, LanguageContext } from './_app'
import OpenCard from '../components/OpenCard'
import Navbar from '../components/Navbar'
import { useAppStore } from '../stores/appStore'
import Instructions from '../components/Instructions'
import { IoCloseOutline } from "react-icons/io5"

export default function Home() {
  const { 
    theme, 
    setTheme,
    language,
    setLanguage,
    wordAnswer, 
    setWordAnswer,
    isSolved, 
    setIsSolved,
    submitError, 
    setSubmitError,
    isInstructionOpen,
    handleInstruction,
    setOverlay
  } = useAppStore()

  const [isOpenCard, setIsOpenCard] = useState(false)
  const handleOpenCard = () => {
    setIsOpenCard(false)
    setOverlay(false)
    localStorage.setItem('openCard', false)

  }
  const guessColumn = new Array(6).fill("");
  const [curGuess, setCurGuess] = useState('');
  const [guessNumber, setGuessNumber] = useState(0)
  const [oldGuesses, setOldGuesses] = useState(new Array(6).fill(""));
  const [lengthError, setLengthError] = useState(false)

  const handleLengthError = () => {
    if (curGuess.length < 5) setLengthError(true)
  }
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function newWord() {
    if (language == "en") {
      return enWordData.wordData[Math.floor(Math.random() * enWordData.wordData.length)].word.toUpperCase();
    } else {
      const word = spanWordData[Math.floor(Math.random() * spanWordData.length)].toUpperCase()
      return removeAccents(word)
    }
  }

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    const storedOpenCard = localStorage.getItem('openCard');
    const storedTheme = localStorage.getItem('theme')
    if (storedOpenCard) {
      setIsOpenCard(false)
      setOverlay(false)
      localStorage.setItem('openCard', false)
    }
     else {
      setIsOpenCard(true)
    }

    if (storedLanguage && storedTheme) {
      setLanguage(storedLanguage)
      setTheme(storedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)

  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language)
    setWordAnswer(newWord());
  }, [language])

  useEffect(() => {
    setTimeout(() => {
      setLengthError(false)
    }, 1300)
  }, [lengthError])

  useEffect(() => {
    setTimeout(() => {
      setSubmitError(false)
    }, 6000)
  }, [submitError])

  const updateGuess = (event) => {
    setCurGuess(prev => prev + event.target.value) 
  }


  const submitGuess = (event) => {
    {event ? event.preventDefault() : ''}
    if (curGuess.length !== 5) return

    if (isSolved || guessNumber > 5) return
    // does not continue if guess has < 5 letters

    // checking if guess is a real word
    if (language == "en" && !enWordData.wordData.find(word => word.word.toUpperCase() === curGuess)) {
      setSubmitError(true)
      return 
    } 

    if (language == "es" && !spanWordData.find(word => removeAccents(word.toUpperCase()) === curGuess)) {
      setSubmitError(true)
      return
    }

    if (guessNumber < 6 && !isSolved) {
      // valid word, add guss and increment guessNumber
      setOldGuesses((prevGuesses) => {
        const newGuesses = [...prevGuesses];
        newGuesses[guessNumber] = curGuess;
        return newGuesses;
      })
      setGuessNumber(prev => prev + 1)
    }
  
    // checking if guess matches wordAnswer or not
    if (curGuess ===  wordAnswer ) {
      setIsSolved(true)
      setGuessNumber(5)
      return
    }
    setCurGuess('')
  }

  const handleDelete = () => {
    setCurGuess(prev => prev.slice(0, -1))
    if (submitError) setSubmitError(false)
  }

  const handleClick = (event) => {
    event.preventDefault()
    if ( curGuess.length != 5 && 
          guessNumber <= 5  && 
          !isSolved) {
      updateGuess(event)
    }
  }

  const handleKeyDown = (event) => {
    // if (!isSolved && curGuess.length !== 5 || guessNumber > 5) {
    if (event.key.match(/^[a-zA-Z]$/) && isSolved == false && curGuess.length !== 5) {
      // Add the letter to the current guess if it's a letter
      setCurGuess(prev => prev + event.key.toUpperCase());
    }  
    
    if (event.key === "Enter" && guessNumber <= 5) {
      // Run a function if Enter is pressed
      if (curGuess.length < 5) setLengthError(true)
      submitGuess();

    } else if (event.key === "Backspace" && !isSolved) {
      // Run a different function if Delete is pressed
      handleDelete();
      setSubmitError(false)
    }
  }

  const resetGame = () => {
    setWordAnswer(newWord())
    setCurGuess("")
    setGuessNumber(0)
    setOldGuesses(new Array(6).fill(""));
    setIsSolved(false)
  }
  
  return (
    <div className={styles.homeContainer}>   
      <Navbar resetGame={resetGame} />
      
      {isOpenCard && 
        <div className={styles.overlay}>
          <OpenCard handleOpenCard={handleOpenCard} /> 
        </div>
      }

      {isInstructionOpen && 
        <div className={styles.overlay}>
          <div 
          className={`
            ${styles.instructionContainer}
            ${theme == "dark" ? 
              styles.instructionDark : styles.instructionLight 
            }
          `}
          > 
            <IoCloseOutline 
              className={styles.closeIcon} 
              onClick={() => {
                setOverlay(false)
                handleInstruction()
              }}
            />
            <Instructions /> 
            <button 
              className={
                theme == "dark" ? 
                styles.closeDark : styles.closeLight 
              }
              onClick={() => {
                setOverlay(false)
                handleInstruction()
              }}
            > 
              {language == "en" ? <p> Close </p> : <p> Cerrar </p>} 
            </button>
          </div>
        </div>
      }
         
      {isSolved || guessNumber > 5 ? 
        <div className={styles.overlay}>
          <NewGameCard 
            resetGame={resetGame} 
          /> 
        </div>
          : <></>
      }
      <h1 id={styles.title}> En Es Wordle </h1>
      {lengthError && 
        <div 
          className={`
            ${styles.lengthText} 
            ${theme == "dark" ? styles.errorTextDark : styles.errorTextLight}
            ${lengthError ? styles.lengthErrorText : ''}
          `}> 
          {language == "en" ? 
            <p> Not 5 letters </p> : <p> No son 5 letras </p>
          }
        </div>
      }

      {/* <button onClick={() => {
        localStorage.clear()
        window.location.reload()
      }}>
        here
      </button> */}

      <div id={styles.contentContainer}>
        {guessColumn.map((guess, idx) => {
          return ( 
            <GuessRow 
              guess={
                guessNumber === idx ? 
                curGuess : guessNumber > idx ? 
                oldGuesses[idx] : ""
              } 
              key={idx} 
              guessNumber={guessNumber}
              guessIdx={idx}
              lengthError={lengthError}
            /> 
          )
        })}
        {/* {!isOpenCard && !isSolved && guessNumber < 6 && */}
          <Keyboard 
            curGuess={curGuess}
            handleClick={handleClick}
            submitGuess={submitGuess}
            handleDelete={handleDelete}
            oldGuesses={oldGuesses}
            handleKeyDown={handleKeyDown}
            handleLengthError={handleLengthError}
          />
        {/* } */}
      </div>
    </div>
  )
}
