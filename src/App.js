import React, { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import "./styles/app.scss";
import data from "./data";
import Library from './components/Library';
import Nav from './components/Nav';

function App() {
  // Ref 
  const audioRef = useRef(null);
  // State
  const [songs, setSongs] = useState(data());

  const [currentSong, setCurrentSong] = useState(songs[0]);

  const [isPlaying, setIsPlaying] = useState(false);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const [libraryStatus, setLibraryStatus] = useState(false);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // Calculate percentage of input bar
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const inputProgress = Math.round((roundedCurrent / roundedDuration) * 100);


    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: inputProgress,
    });
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  }

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song
        currentSong={currentSong}
        isPlaying={isPlaying}
      />
      <Player
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}

      />
      <Library
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      />
    </div>

  );
}

export default App;
