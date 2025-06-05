import {CircularProgress} from "@heroui/react";


const Loading = () => {
    return (
        <div className={"flex justify-center items-center h-[400px]"}>
            <CircularProgress label={"Loading..."} />
        </div>
    )
};

export default Loading;