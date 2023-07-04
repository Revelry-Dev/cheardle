import React, { useEffect  } from 'react'
import useGlobal from '../hooks/useGlobal'
import Player from './Player';
import ShareButton from './ShareButton';

const CORRECT_H1 = "Well Done!"
const CORRECT_H2 = "You guessed today's Cheardle. Come back tomorrow to keep the current streak!"
const INCORRECT_H1 = "Better luck next time!"
const INCORRECT_H2 = "You didn't get today's Cheardle, but try again tomorrow!"
const SongPage = () => {
    const {correctSong, isCorrect } = useGlobal();
    
    const imgURL = `https://img.youtube.com/vi/${correctSong.id}/maxresdefault.jpg`

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };


    //on mount
    useEffect(() => {
        localStorage.setItem("last-played", new Date());
    },[])
   
    return (
        <div id="songpage-container">
            
            <div id="song-box" onClick={() => openInNewTab(`https://youtu.be/${correctSong.id}&t=${Math.floor(correctSong.offset)}`)}>
                <div id="img-text-container">    
                    <img src={imgURL} id="thumbnail-img" alt="{correctSong}"/>
                    <div id="name-and-artist">
                        <p>{correctSong.name}</p>
                        <p id='song-artist'>{correctSong.artist}</p>
                    </div>
                </div>
                <img src={"https://cdn-icons-png.flaticon.com/512/1384/1384060.png"} alt ="youtube icon" id="yt-icon"></img>
            </div>
            <h1>{isCorrect? CORRECT_H1:INCORRECT_H1} </h1>
            <div id="dashes-container">
                {[...Array(6)].map((x, i) => <div className="dash" key={i}/>)}
            </div>
            <h2>{isCorrect? CORRECT_H2:INCORRECT_H2}</h2>
            <ShareButton/>
            <Player/>            
            
            
        </div>
    )
}

export default SongPage