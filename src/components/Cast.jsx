import { useSelector } from "react-redux";


import ContentWrapper from "./ContentWrapper";
import Img from "./LazyloadImage/Img";
import avatar from "../assets/avatar.png";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle w-[125px] h-[125px] rounded-full mb-[15px] md:w-[175px] md:h-[175px] md:mb-[25px] skeleton"></div>
                <div className="row w-full h-5 rounded-lg mb-[10px] skeleton"></div>
                <div className="row2 w-[75%] h-5 rounded-lg my-0 mx-auto skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection relative mb-[50px]">
            <ContentWrapper>
                <div className="sectionHeading text-xl text-white mb-[25px] md:pt-12">Top Cast</div>
                {loading === false ? (
                    <div className="listItems flex gap-5 overflow-y-hidden -mr-5 -ml-5 py-0 px-5 md:m-0 md:p-0">
                        {data?.map((item) => {
                            let imgUrl = item.profile_path
                                ? url.profile + item.profile_path
                                : avatar;
                            return (
                                <div key={item.id} className="listItem text-center text-white">
                                    <div className="profileImg w-[125px] h-[125px] rounded-3xl overflow-hiddenmb-[15px] md:w-[175px] md:h-[175px] md:mb-[25px]">
                                        <Img src={imgUrl} />
                                    </div>
                                    <div className="name text-sm leading-5 font-semibold md:text-lg md:leading-6">{item.name}</div>
                                    <div className="character text-sm leading-5 opacity-50 md:text-lg md:leading-6">
                                        {item.character}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton flex gap-5 overflow-y-hidden -mr-5 -ml-5 py-0 px-5 md:p-0 md:m-0">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;