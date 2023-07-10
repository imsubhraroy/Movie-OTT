/* eslint-disable react/prop-types */

const ContentWrapper = ({ className, children }) => {
    return <div className={`contentWrapper w-[100%] max-w-[1200px] mt-0 mb-0 ml-auto mr-auto pt-0 pb-0 pl-auto pr-auto ${className}`}>{children}</div>;
};

export default ContentWrapper;