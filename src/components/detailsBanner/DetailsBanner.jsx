import { useParams } from "react-router-dom";
import ContentWrapper from "../ContentWrapper";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../LazyloadImage/Img";
import React, { useState } from "react";
import PosterFallBack from "../../assets/no-poster.png";
import dayjs from "dayjs";
import Genres from "../Genres";
import CircleRating from "../circleRating/CircleRating";
import "./style.scss";
import { PlayIcon } from "../PlayBtn";
import VideoPopup from "../VideoPopUp";

function DetailsBanner({ video, crew }) {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const { url } = useSelector((state) => state.home);

  const toHoursAndMinute = (totalMinute) => {
    const hours = Math.floor(totalMinute / 60);
    const minutes = totalMinute % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const _genre = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.known_for_department === "Directing");
  const writer = crew?.filter(
    (f) =>
      f.known_for_department === "Production" ||
      f.known_for_department === "Writing" ||
      f.known_for_department === "Art"
  );

  return (
    <>
      <div className="detailsBanner w-full bg-[#04152d] pt-[100px] mb-[50px] md:mb-0 md:pt-[120px] md:min-h-[700px]">
        {loading === false ? (
          <>
            {!!data && (
              <React.Fragment>
                <div className="backdrop-img w-full h-full absolute top-0 left-0 opacity-[0.1] overflow-hidden">
                  <Img src={url.backdrop + data?.backdrop_path} />
                </div>
                <div className="opacity-layer w-full h-[250px] absolute bottom-0 left-0 bg-gradient-to-t from-transparent via-[#04152d]"></div>
                <ContentWrapper>
                  <div className="content flex relative flex-col gap-[25px] md:gap-[50px] md:flex-row">
                    <div className="left flex-shrink-0">
                      {data.poster_path ? (
                        <Img
                          className="posterImg w-full block rounded-xl md:max-w-[350px]"
                          src={url.backdrop + data?.poster_path}
                        />
                      ) : (
                        <Img
                          className="posterImg w-full block rounded-xl md:max-w-[350px]"
                          src={PosterFallBack}
                        />
                      )}
                    </div>
                    <div className="right text-white">
                      <div className="title text-[20px] leading-10 md:text-[28px] md:leading-[44px]">
                        {`${data.name || data.title} (${dayjs(
                          data.release_date
                        ).format("YYYY")})`}
                      </div>
                      <div className="subTitle text-[16px] leading-6 mb-[15px] italic opacity-[0.5] md:text-[20px] md:leading-7">
                        {data.tagline}
                      </div>
                      <Genres data={_genre} />
                      <div className="row flex items-center gap-[25px] mb-[25px]">
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                        <div
                          className="playbtn"
                          onClick={() => {
                            setShow(true);
                            setVideoId(video.key);
                          }}
                        >
                          <PlayIcon />
                          <span className="text">Watch Tailer</span>
                        </div>
                      </div>
                      <div className="overview mb-[25px]">
                        <div className="heading text-[24px] mb-[10px]">
                          Overview
                        </div>
                        <div className="description leading-6 md:pr-[100px] text-sm p-1">
                          {data.overview}
                        </div>
                      </div>
                      <div className="info py-[15px] px-0 flex">
                        {data.status && (
                          <div className="infoItem mr-[10px] flex">
                            <span className="text mr-[10px] opacity-1 font-semibold leading-6">
                              Status:{" "}
                            </span>
                            <span className="text mr-[10px] opacity-[0.5] leading-6">
                              {data.status}
                            </span>
                          </div>
                        )}
                        {data.release_date && (
                          <div className="infoItem mr-[10px] flex">
                            <span className="text mr-[10px] opacity-1 font-semibold leading-6">
                              Release Date:{" "}
                            </span>
                            <span className="text mr-[10px] opacity-[0.5] leading-6">
                              {dayjs(data.release_date).format("MMM D, YYYY")}
                            </span>
                          </div>
                        )}
                        {data.runtime && (
                          <div className="infoItem mr-[10px] flex">
                            <span className="text mr-[10px] opacity-1 font-semibold leading-6">
                              Duration:{" "}
                            </span>
                            <span className="text mr-[10px] opacity-[0.5] leading-6">
                              {toHoursAndMinute(data.runtime)}
                            </span>
                          </div>
                        )}
                      </div>
                      {director?.length > 0 && (
                        <div className="info py-[15px] px-0 flex">
                          <span className="text mr-[10px] opacity-1 font-semibold leading-6">
                            Director:{" "}
                          </span>
                          <span className="text mr-[10px] opacity-[0.5] leading-6">
                            {director?.map((d, i) => (
                              <span key={i}>{i === 0 ? d.name : ""}</span>
                            ))}
                          </span>
                        </div>
                      )}

                      {writer?.length > 0 && (
                        <div className="info py-[15px] px-0 flex">
                          <span className="text  mr-[10px] opacity-1 font-semibold leading-6">
                            Writer:{" "}
                          </span>
                          <span className="text mr-[10px] opacity-[0.5] leading-6">
                            {writer?.map((d, i) => (
                              <span key={i}>
                                {i <= 1 ? d.name : ""}
                                {i === 0 ? ", " : ""}
                              </span>
                            ))}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <VideoPopup
                    show={show}
                    setShow={setShow}
                    videoId={videoId}
                    setVideoId={setVideoId}
                  />
                </ContentWrapper>
              </React.Fragment>
            )}
          </>
        ) : (
          <div className="detailsBannerSkeleton flex relative flex-col gap-[25px] md:gap-[50px] md:flex-row">
            <ContentWrapper className="flex gap-[50px] mt-0 mb-0 ml-auto mr-auto pt-0 pb-0 px-2 md:px-4">
              <div className="left flex-shrink-0 w-full block rounded-xl aspect-[1/1.5] md:max-w-[350px] skeleton"></div>
              <div className="right w-full">
                <div className="row w-full h-6 mb-5 rounded-full skeleton"></div>
                <div className="row w-full h-6 mb-5 rounded-full skeleton"></div>
                <div className="row w-full h-6 mb-5 rounded-full skeleton"></div>
                <div className="row w-full h-6 mb-5 rounded-full skeleton"></div>
                <div className="row w-full h-6 mb-5 rounded-full skeleton"></div>
                <div className="row w-full h-6 mb-5 rounded-full skeleton"></div>
                <div className="row w-full h-6 mb-5 rounded-full skeleton"></div>
              </div>
            </ContentWrapper>
          </div>
        )}
      </div>
    </>
  );
}

export default DetailsBanner;
