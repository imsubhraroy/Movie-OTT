import { useSelector } from "react-redux";

function Genres({ data }) {
  const { genres } = useSelector((state) => state.home);

  return (
    <>
      <div className="genres flex gap-[5px]">
        {data?.map((g) => {
            if (!genres[g]?.name) return;
          return <div key={g} className="genre bg-[#da2f68] py-[3px] px-[5px] text-[12px] rounded text-white whitespace-nowrap">
            {genres[g].name}
          </div>;
        })}
      </div>
    </>
  );
}

export default Genres;
