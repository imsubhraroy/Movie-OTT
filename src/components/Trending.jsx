import { useState } from "react";
import ContentWrapper from "./ContentWrapper";
import SwitchTabs from "./switchTab/SwitchTabs";
import useFetch from "../hooks/useFetch";
import Carousel from "./carousel/Carousel";

function Trending() {
  const [endPoint, setEndPoint] = useState("day");

  const { data, loading } = useFetch(`/trending/all/${endPoint}`);

  const onTabChange = (tab) => {
    setEndPoint(tab === "Day" ? "day" : "week");
  };

  return (
    <>
      <div className="carouselSection relative mb-[70px] px-2">
        <ContentWrapper className="flex items-center justify-between mb-5 mt-0  ml-auto mr-auto pt-0 pb-0 px-1 md:px-4">
          <span className="carouselTitle text-xl md:text-2xl text-gray-100 font-medium md:pl-4">
            Trending
          </span>
          <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
      </div>
    </>
  );
}

export default Trending;
