import React from 'react'
import styles from '../styles/Instructions.module.css'
import { useAppStore } from '../stores/appStore'
export default function Instructions() {
  const {language, handleInstruction } = useAppStore()
  return (
    <div>
      {language == "en" ?
        <div className={styles.instructionContent}>
          <div className={styles.title}> How to play </div>
          <div> Objective: Guess the word in 6 tries </div>
          <ul className={styles.list} >
            <li> Each guess must be a 5-letter word </li>
            <li> Type each word and press 'Enter' to check guess </li>
            <li> 
              The color of each tile 
              will represent how close each  
              letter is to the word
            </li>
          </ul>
          <div>
            <p className={styles.colorTitle}> Colors: </p>
            <ul className={styles.list}>
              <li> 
                Green: Letter is in word and in 
                correct position
              </li>
              <li>
                Yellow: Letter is in word but 
                not in correct position
              </li>
              <li>
                Grey: Letter is not in word
              </li>
            </ul>
            
          </div>
        </div> 
        : 
        <div className={styles.instructionContent}>
          <div className={styles.title}> Como jugar </div>
          <div> Objetivo: Adivina la palabra en 6 intentos  </div>
          <ul className={styles.list} >
            <li> Cada intento debe ser una palabra de 5 letras </li>
            <li> Tildes no estan incluidos: é = e </li>
            <li> Escribe cada palabra y presiona 'Enivar' para revisar tu intento </li>
            <li> 
              El color de cada cuadro representa que cerca
              esta la letra de la palabra
            </li>
          </ul>
          <div>
            <p className={styles.colorTitle}> Colores: </p>
            <ul className={styles.list}>
              <li> 
                Verde: Letra esta en la palabra y posicion corecta
              </li>
              <li>
                Amarillo: Letra esta en la palabra pero la posicion 
                no es corecta
              </li>
              <li>
                Gris: Letra no esta en la palabra
              </li>
            </ul>
            
          </div>
        </div> 
      }
    </div>
  )
}
