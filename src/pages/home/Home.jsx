import HeroBanner from "../../components/HeroBanner";
import Popular from "../../components/Popular";
import Trending from "../../components/Trending";

export default function Home() {
  return (
    <>
      <div>
        <HeroBanner />
          <Trending />
          <Popular />
          <Popular />
      </div>
    </>
  );
}
