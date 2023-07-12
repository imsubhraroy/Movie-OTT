import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import Spinner from "../../components/Spinner";
import ContentWrapper from "../../components/ContentWrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../../components/MovieCard";

export default function SearchResault() {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data.results, ...res.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <>
      <div className="searchResultsPage min-h-[700px] pt-[100px] ">
        {loading && <Spinner initial={true} />}
        {loading === false && (
            <ContentWrapper>
                {data?.results?.length > 0 ? (
                    <>
                        <div className="pageTitle text-2xl text-white mb-[25px]">
                            {`Search ${data.total_results > 1 ? "results" : "result"} of ${query}`}
                        </div>
                        <InfiniteScroll className="content flex gap-[10px] mb-[50px] md:gap-5 " dataLength={data?.results?.length || ''}
                            next={fetchNextPageData}
                            hasMore={pageNum <= data?.total_pages}
                            loader={<Spinner />}
                        >
                            
                            {data.results.map((item,i)=>{
                                if(item.media_type === "person") return;
                                return (
                                    <MovieCard data={item} key={i} fromSearch={true} />
                                );
                            })}
                        </InfiniteScroll>
                    </>
                ):(
                    <span className="resultNotFound text-2xl text-[#173d77]">
                        Sorry, Result not found.
                    </span>
                )}
            </ContentWrapper>
        )}
      </div>
    </>
  );
}
