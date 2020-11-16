import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';


const Player = ({ audioRef,
    setSongInfo,
    songInfo,
    currentSong,
    isPlaying,
    setIsPlaying,
    songs,
    setCurrentSong,
    setSongs,
}) => {

    //UseEffect

    useEffect(() => {
        const newSongs = songs.map((song) => {
            if (song.id === currentSong.id) {
                return {
                    ...song,
                    active: true,
                }
            } else {
                return {
                    ...song,
                    active: false,
                }
            }
        });
        setSongs(newSongs);
    }, [currentSong]);

    //Event Handlers
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    /*  const getTime = (time) => {
         return (
             Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
         );
     }; */
    const getTime = time => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        const secondsWithZero = String(seconds).padStart(2, "0")
        return `${minutes}:${secondsWithZero}`
    }
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value })
    }
    const skipTrackHandler = (direction) => {

        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === 'skip-forward') {
            setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            // using the modulus as a failsafe to reset the index to 0 when it reaches the end of array

        }
        if (direction === 'skip-back') {
            if ((currentIndex - 1) % songs.length === -1) {
                setCurrentSong(songs[songs.length - 1]);
                return;
            }
            setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        }

        /* let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        let newIndex = 0;
        switch (direction) {
            case "skip-forward":
                //if you reach max, go back to zero
                newIndex = (currentIndex + 1) % songs.length;
                break;

            case "skip-back":
                //if you reach zero, go back to max
                newIndex = (songs.length - 1 + currentIndex) % songs.length;
                break;

            default: break;
        }
        setCurrentSong(songs[newIndex]); */
    };








    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input
                    min={0}
                    max={songInfo.duration || 0}
                    value={songInfo.currentTime}
                    onChange={dragHandler}
                    type="range"></input>
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className="skip-forward" size="2x" icon={faAngleRight} />
            </div>
        </div>
    )


}

export default Player;