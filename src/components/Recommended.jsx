import Carousel from "./carousel/Carousel";
import useFetch from "../hooks/useFetch";

function Recomended({ mediaType }) {
  const { data, loading } = useFetch(`/${mediaType}/popular`);
  const title = "Recomendation";

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

export default Recomended;
