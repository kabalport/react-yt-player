import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import './App.css';

function App() {
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [playbackRate, setPlaybackRate] = useState(1.0);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);

    // 재생 위치를 변경하는 함수
    const onSeek = (value: number) => {
        if (playerRef.current) {
            playerRef.current.seekTo(value, 'fraction');
        }
    };

    const togglePlay = () => {
        setPlaying(!playing);
    };

    // Ref의 타입을 ReactPlayer로 정의합니다.
    const playerRef = useRef<ReactPlayer>(null);

    useEffect(() => {
        // 타입 검사를 위해 optional chaining을 사용합니다.
        setDuration(playerRef.current?.getDuration() ?? 0);
    }, []);

    // state의 타입을 명시적으로 정의합니다.
    const onProgress = (state: { played: number }) => {
        setPlayed(state.played);
    };

    // seconds의 타입을 명시적으로 정의합니다.
    const formatDuration = (seconds: number) => {
        const date = new Date(0);
        date.setSeconds(seconds);
        const timeString = date.toISOString().substr(11, 8);
        return timeString;
    };

    return (
        <div className="App">
            <div className="player-wrapper">
                <ReactPlayer
                    ref={playerRef}
                    className="react-player"
                    url="https://www.youtube.com/watch?v=pSUydWEqKwE"
                    playing={playing}
                    volume={volume}
                    playbackRate={playbackRate}
                    onProgress={onProgress}
                    width="100%"
                    height="100%"
                />
                <div className="controls">
                    <button onClick={togglePlay}>
                        {playing ? "Pause" : "Play"}
                    </button>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                    />
                    <select
                        value={playbackRate}
                        onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                    >
                        <option value={0.5}>0.5x</option>
                        <option value={1}>1x</option>
                        <option value={1.5}>1.5x</option>
                        <option value={2}>2x</option>
                    </select>
                    <span>
            {formatDuration(played * duration)} / {formatDuration(duration)}
          </span>

                    {/* 프로그레스 바 추가 */}
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={played}
                        onChange={(e) => onSeek(parseFloat(e.target.value))}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
