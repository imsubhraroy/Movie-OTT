import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import Img from "./LazyloadImage/Img";
import CircleRating from "./circleRating/CircleRating";
import Genres from "./Genres";
import PosterFallback from "../assets/no-poster.png"

const MovieCard = ({ data, fromSearch, mediaType }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;
    return (
        <div
            className="movieCard w-[calc(50%-5px)] mb-[25px] cursor-pointer flex-shrink-0 md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] "
            onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            <div className="posterBlock relative w-full aspect-[1/1.5] bg-cover bg-center mb-[30px] flex items-end justify-between p-[10px] ">
                <Img className="posterImg" src={posterUrl} />
                {!fromSearch && (
                    <React.Fragment>
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                        <Genres data={data.genre_ids.slice(0, 2)} />
                    </React.Fragment>
                )}
            </div>
            <div className="textBlock text-white flex flex-col">
                <span className="title text-base mb-[10px] md:text-xl line-clamp-1 overflow-ellipsis">{data.title || data.name}</span>
                <span className="date text-sm opacity-50">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;