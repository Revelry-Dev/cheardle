import React from 'react'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AboutPop = ({close}) => {
  return (
    <div className='popup' id="about-pop">
        <FontAwesomeIcon id="close" icon={faX} onClick={close}/>
        <h1>About</h1>
        <p>Each daily Cheardle features a clip from a popular country music song.
          Guess in as few tries as possible, and come back every day for a new song!</p>

          <h2>Credits</h2>
          <p>Inspiration from, of course, the original Heardle game but this was created from the Heardle20s.com game!</p>
          <p>Created by <a href="https://github.com/codente">Jamie</a></p>
     </div>
  )
}

export default AboutPop