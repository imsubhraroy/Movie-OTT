/* eslint-disable no-unused-vars */
import { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../ContentWrapper";
import PosterFallback from "../../assets/no-poster.png";
// import CircleRating from "../circleRating/CircleRating";
// import Genres from "../genres/Genres";
import "./style.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../Genres";
import Img from "../LazyloadImage/Img";

function Carousel({ data, loading, endPoint, title }) {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem w-[125px] cursor-pointer md:w-[calc(20%-15px)] lg:w-[calc(20%-16px)] shrink-0">
        <div className="posterBlock w-full aspect-[1/1.5] mb-[30px]  rounded-xl skeleton">
          <div className="textBlock flex flex-col">
            <div className="title w-full h-[20px] mb-[10px] skeleton"></div>
            <div className="date w-[75%] h-[20px] skeleton"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="carousel mb-[50px]">
        <ContentWrapper className="relative mt-0 mb-0 ml-auto mr-auto pt-0 pb-0 px-2 md:px-4">
          {title && <div className="caroselTitle text-xl md:text-xl text-gray-100 font-medium pb-4">{title}</div>}
          <BsFillArrowLeftCircleFill
            className="carouselLeftNav arrow text-[30px] text-[#04152d] absolute top-[44%] transform translate-y-[-50%] cursor-pointer opacity-[0.5] z-10 hidden md:block hover:opacity-[0.8] left-[30px] pt-2"
            onClick={() => {
              navigation("left");
            }}
          />
          <BsFillArrowRightCircleFill
            className="carouselRightNav arrow text-[30px] text-[#04152d] absolute top-[44%] transform translate-y-[-50%] cursor-pointer opacity-[0.5] z-10 hidden md:block hover:opacity-[0.8] right-[30px] pt-2"
            onClick={() => {
              navigation("right");
            }}
          />
          {loading === false ? (
            <div
              className="carouselItems flex gap-[15px] overflow-y-hidden -mr-[20px] -ml-[20px] py-0 px-5 md:gap-[20px] md:overflow-hidden md:m-0 md:p-0"
              ref={carouselContainer}
            >
              {data?.map((item) => {
                const posterUrl = item.poster_path
                  ? url.poster + item.poster_path
                  : PosterFallback;
                return (
                  <div
                    className="carouselItem w-[125px] cursor-pointer md:w-[calc(20%-15px)] lg:w-[calc(20%-16px)] shrink-0"
                    key={item.id} onClick={()=>{navigate(`/${item.media_type || endPoint}/${item.id}`)}}
                  >
                    <div className="posterBlock relative w-full aspect-[1/1.5] bg-cover bg-center mb-[30px] flex items-end justify-between p-[10px]">
                      <Img src={posterUrl} />
                      <CircleRating rating={item.vote_average.toFixed(1)} />
                      <Genres data={item.genre_ids.slice(0, 2)} />
                    </div>
                    <div className="textBlock text-white flex flex-col line-clamp-1 overflow-ellipsis">
                      <span className="title text-[16px] mb-[10px] md:text-[20px] leading-6">
                        {item.title || item.name}
                      </span>
                      <span className="date text-[14px] opacity-[0.5]">
                        {dayjs(item.release_Date).format("MMM D, YYYY")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="loadingSkeleton flex gap-[10px] overflow-y-hidden -mr-[20px] -ml-[20px] py-0 px-5 md:gap-[20px] md:overflow-hidden md:m-0 md:p-0">
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
              {skItem()}
            </div>
          )}
        </ContentWrapper>
      </div>
    </>
  );
}

export default Carousel;
