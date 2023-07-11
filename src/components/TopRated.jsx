import { useState } from "react";
import ContentWrapper from "./ContentWrapper";
import SwitchTabs from "./switchTab/SwitchTabs";
import useFetch from "../hooks/useFetch";
import Carousel from "./carousel/Carousel";

function TopRated() {
  const [endPoint, setEndPoint] = useState("movie");

  const { data, loading } = useFetch(`/${endPoint}/top_rated`);

  const onTabChange = (tab) => {
    setEndPoint(tab === "Movie" ? "movie" : "tv");
  };

  return (
    <>
      <div className="carouselSection relative mb-[70px] px-2">
        <ContentWrapper className="flex items-center justify-between mb-5 mt-0  ml-auto mr-auto pt-0 pb-0 px-1 md:px-4">
          <span className="carouselTitle text-xl md:text-2xl text-gray-100 font-medium md:pl-4">
            Top Rated
          </span>
          <SwitchTabs data={["Movie", "TV Show"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
      </div>
    </>
  );
}

export default TopRated;
