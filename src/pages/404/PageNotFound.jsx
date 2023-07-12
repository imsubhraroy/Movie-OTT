import ContentWrapper from "../../components/ContentWrapper";

const PageNotFound = () => {
    return (
        <div className="pageNotFound h-[700px] pt-[200px]">
            <ContentWrapper className="flex text-center text-[#173d77] flex-col mt-0 mb-0 ml-auto mr-auto pt-0 pb-0 px-2 md:px-4">
                <span className="bigText text-[150px] font-bold">404</span>
                <span className="smallText text-[44px]">Page not found!</span>
            </ContentWrapper>
        </div>
    );
};

export default PageNotFound;