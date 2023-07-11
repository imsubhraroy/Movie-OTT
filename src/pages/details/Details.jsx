import { useParams } from "react-router-dom";
import DetailsBanner from "../../components/detailsBanner/DetailsBanner";
import useFetch from "../../hooks/useFetch";
import Cast from "../../components/Cast";
import VideosSection from "../../components/VideosSection";

export default function Details() {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: creadit, loading: creaditLoading } = useFetch(`/${mediaType}/${id}/credits`);

  return (
    <>
      <div>
        <DetailsBanner video={data?.results?.[0]} crew={creadit?.crew} />
        <Cast data={creadit?.cast} loading={creaditLoading} />
        <VideosSection data={data} loading={loading} />
      </div>
    </>
  );
}
