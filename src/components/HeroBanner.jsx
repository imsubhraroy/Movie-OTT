import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "./LazyloadImage/Img";
import ContentWrapper from "./ContentWrapper";

export default function HeroBanner() {
  const [query, setQuery] = useState("");
  const [background, setBackground] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data, url]);

  const searchQueryHandle = (e) => {
    if (e.key === "Enter" && query?.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const searchQueryHandleButton = () => {
    if (query) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <>
      <div className="w-full h-[450px] bg-[#04152d] flex items-center relative md:h-[700px] px-4">
        <div className="w-full h-full absolute top-0 left-0 opacity-[0.5] overflow-hidden">
          <Img src={background?.length > 0 ? background : ""} />
        </div>
        <ContentWrapper>
          <div className="w-full h-[250px] opacity-layey absolute bottom-0 left-0"></div>
          <div className="flex flex-col items-center text-white text-center relative max-w-[800px] mt-0 mb-0 ml-auto mr-auto">
            <span className="text-[30px] font-bold mb-[10px] md:mb-0 md:text-[50px]">
              Welcome.
            </span>
            <span className="text-[12px] font-medium mb-[40px] md:mb-6 md:text-lg">
              Millions of movies, TV shows and people to discover. Explore now.
            </span>
            <div className="flex items-center w-full">
              <input
                className="w-[calc(100%-100px)] h-[40px] bg-white outline-0 border-0 rounded-l-3xl pt-0 pb-0 pl-[15px] pr-[15px] text-[14px] md:w-[calc(100%-150px)] md:h-[45px] md:text-[20px] md:pt-0 md:pb-0 md:pl-[30px] md:pr-[30px] text-gray-600"
                type="text"
                placeholder="Search for a movie or tv show.. "
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                onKeyUp={searchQueryHandle}
              />
              <button
                className="w-[100px] h-[40px] search-button text-white outline-0 border-0 rounded-r-3xl text-[16px] cursor-pointer md:w-[150px] md:h-[45px] md:text-[18px]"
                onClick={searchQueryHandleButton}
              >
                Search
              </button>
            </div>
          </div>
        </ContentWrapper>
      </div>
    </>
  );
}
