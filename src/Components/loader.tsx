import Loader from "react-loader-spinner";

export const Spinner = () => {
    return (
        <>
            <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}
            />
        </>
    );
}