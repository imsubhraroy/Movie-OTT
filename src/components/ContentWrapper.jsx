/* eslint-disable react/prop-types */

const ContentWrapper = ({ className, children }) => {
    return <div className={`contentWrapper w-[100%] max-w-[1200px]  ${className ? className : "mt-0 mb-0 ml-auto mr-auto pt-0 pb-0 px-2 md:px-4"}`}>{children}</div>;
};

export default ContentWrapper;