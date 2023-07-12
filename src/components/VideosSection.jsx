import { useState } from "react";
import ContentWrapper from "./ContentWrapper";
import Img from "./LazyloadImage/Img";
import { PlayIcon } from "./PlayBtn";
import VideoPopup from "./VideoPopUp";



const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const loadingSkeleton = () => {
        return (
            <div className="skItem w-[150px] flex-shrink-0 md:w-[25%]">
                <div className="thumb w-full aspect-[16/9] rounded-xl mb-[10px] skeleton"></div>
                <div className="row h-5 w-full rounded-xl mb-[10px] skeleton"></div>
                <div className="row2 h-5 w-[75%] rounded-xl skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection relative mb-[50px]">
            <ContentWrapper>
                <div className="sectionHeading text-xl text-white mb-[25px]">Official Videos</div>
                {loading === false ? (
                    <div className="videos flex gap-[10px] overflow-x-auto -mr-5 -ml-5 py-0 px-5 md:gap-5 md:m-0 md:p-0 ">
                        {data?.results?.map((video) => (
                            <div
                                key={video.id}
                                className="videoItem gap-5 flex-shrink-0 md:w-[25%] cursor-pointer"
                                onClick={() => {
                                    setVideoId(video.key);
                                    setShow(true);
                                }}
                            >
                                <div className="videoThumbnail mb-[15px] relative h-[165px] md:h-[170px]">
                                    <Img
                                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                    />
                                    <PlayIcon />
                                </div>
                                <div className="videoTitle text-white text-sm leading-5 md:text-base md:leading-6 ">{video.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="videoSkeleton flex gap-[10px] overflow-x-auto -mr-5 -ml-5 py-0 px-5 md:gap-5 md:m-0 md:p-0">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;