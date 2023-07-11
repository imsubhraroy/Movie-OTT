import ReactPlayer from "react-player/youtube";


const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };
    return (
        <div className={`videoPopup flex justify-center items-center w-full h-full fixed top-0 left-0  z-[9] ${show ? "opacity-[1] visible" : "opacity-0 invisible"}`}>
            <div className={`opacityLayer absolute top-0 left-0 w-full h-full  ${show ? "opacity-[1]" : "opacity-0"}`} onClick={hidePopup}></div>
            <div className={`videoPlayer relative w-[800px] aspect-[16/9] bg-white`}>
                <span className="closeBtn absolute top-[-20px] right-0 text-white cursor-pointer" onClick={hidePopup}>
                    Close
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                    // playing={true}
                />
            </div>
        </div>
    );
};

export default VideoPopup;