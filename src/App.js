import Layout from "./components/Layout";
import useGlobal from "./hooks/useGlobal";
import { useEffect,useState } from "react";
import YouTube from 'react-youtube';
import raw from './rsc/days-songs.txt';


const EMPTY_SCORES_OBJ = 
    {
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
        "X":0
    }


const NUM_MS_IN_DAY = 86400000;
const STARTING_POINT = 1669248000000;
const OPTS = {width: "0", height:"0"}

function App() {

  const {setHasPlayedToday,setIsCorrect,playerRef, correctSong, setCorrectSong, setIsPlaying, ytReady, setDuration, duration, setYtReady } = useGlobal();
  const [t,setT] = useState(false)


  const getCorrectSongIndex = () =>{
    const today = new Date();
    return Math.floor((today.getTime() - STARTING_POINT) / NUM_MS_IN_DAY)
  }

  useEffect(() =>{

    fetch(raw)
    .then(r => r.text())
    .then(text => {
      let s = JSON.parse(text);
      setCorrectSong(s[getCorrectSongIndex() % s.length]) //so songs now loop
   });

    const lastStarted = new Date(localStorage.getItem("last-started"))
    const lastPlayed = new Date(localStorage.getItem("last-played"))
    const wonLast = JSON.parse(localStorage.getItem("won-last"));

    if(isToday(lastPlayed)){
        setHasPlayedToday(true);
        resetStoredGuesses();
        setIsCorrect(wonLast)
        return
    }

    if(!isToday(lastStarted)){
        resetStoredGuesses();
    }

    localStorage.setItem("last-started", new Date())
    
    //check if scores in storage - if not, add them
    localStorage.getItem("scores") == null && localStorage.setItem("scores", JSON.stringify(EMPTY_SCORES_OBJ))  
  
},[ setCorrectSong, setHasPlayedToday, setIsCorrect])


  const isToday = (someDate) => {
    const today = new Date()
    return someDate?.getDate() === today.getDate() &&
      someDate?.getMonth() === today.getMonth() &&
      someDate?.getFullYear() === today.getFullYear()
  }
  const resetStoredGuesses = () =>{
    localStorage.setItem("guesses", JSON.stringify(['','','','','','']))
}

  const onReady = () =>{
    const ip = playerRef.current.internalPlayer;
    ip.playVideo();

  }

  const onStateChange =(e) =>{
    if(e.data === 2){
      setIsPlaying(false)
      return
    }
    
    
    if(e.data === 1) {
      setIsPlaying(true)
      return
    }
    
    if(ytReady && e.data === 3){
      setIsPlaying(false)
      return
    }

    if(e.data !== -1 || ytReady) return
    if(!t){
      setT(true)
      return
    }

   
    const getDuration = (async() =>{
    const durationPromise = playerRef.current.internalPlayer.getDuration()
    durationPromise.then((d)=>{
      setDuration(Math.floor(d - correctSong.offset))
      setYtReady(true)
      console.log(ytReady)
      console.log(duration)
      console.log(getDuration)
    
    }
    )})();
   
   
  } 

  return ( 
    <>

    {correctSong? 
    <div id="App">
      <YouTube opts={OPTS} onReady={onReady} videoId={correctSong.id} ref={playerRef} onStateChange={onStateChange} id="yt player" />
       <Layout />
       
    </div>
    
    : <></>
}
    </>
  );
}

export default App;
