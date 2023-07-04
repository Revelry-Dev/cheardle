import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faMusic, faThumbsUp, faVolumeHigh, faX } from '@fortawesome/free-solid-svg-icons'

const HowToPlayPop = ({close}) => {
  return (
    <div className='popup'>
        <FontAwesomeIcon id="close" icon={faX} onClick={close}/>        
        <h1>How to Play</h1>
        
        <div className="htp-list">
        <FontAwesomeIcon icon={faMusic} className = "icon"/>
        <p>Listen to the song, then select the correct country song in the list.</p>
        </div>

        <div className="htp-list">
        <FontAwesomeIcon icon={faVolumeHigh} className = "icon" />
        <p>Skipped or incorrect attempts unlock more of the song.</p>
        </div>

        <div className="htp-list">
        <FontAwesomeIcon icon={faThumbsUp} className = "icon"/>
        <p>Find the song in as few tries as possible and share your score!</p>
        </div>
    </div>
  )
}

export default HowToPlayPop