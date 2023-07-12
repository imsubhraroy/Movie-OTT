import Carousel from "./carousel/Carousel";
import useFetch from "../hooks/useFetch";

function Similar({ mediaType, id }) {
  const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);
  const title = mediaType === "tv" ? "Similar Tv Shows" : "Similar Movies";

  return (
    <>
        <Carousel
          data={data?.results}
          loading={loading}
          title={title}
          endPoint={mediaType}
        />
    </>
  );
}

export default Similar;
