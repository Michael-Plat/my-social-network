import React, { useRef } from "react";
import s from "./PageNo.module.css";
import videoCoffee from "../../../assets/video/Pretty girl with cup of coffee laughing at camera_preview.mp4";

const PageNo = () => {
    const vidRef = useRef();
    const handlePauseVideo = () => {
        vidRef.current.pause();
    }
    const handlePlayVideo = () => {
        vidRef.current.play();
    }
    return (
        <div>
            {/* The video  */}
            <video id="myVideo" ref={vidRef} autoPlay muted loop>
                <source src={videoCoffee}
                    type="video/mp4" />
            </video>
            {/* Optional: some overlay text to describe the video  */}
            <div className={s.content}>
                <h1>Sorry, this page is under construction</h1>
                <p>Don't worry, our team will do everything on time</p>
                <h3>Now we can have coffee</h3>
                {/* Use a button to pause/play the video */}
                <button className={s.myBtn} onClick={handlePauseVideo}>Pause</button>
                <button className={s.myBtn} onClick={handlePlayVideo}>Play</button>
            </div>
        </div>
    )
}

export default PageNo;