import React from "react";
import Headbar from "../../components/headbar/Headbar";
import Sidemenu from "../../components/sidemenu/Sidemenu";
import Widgets from "../../components/widgets/Widgets";
import Feed from "../../components/feed/Feed";

const HomePage = () => {
    return (
        <div className="w-full min-w-fit">
            <Headbar/>
            <div className="flex justify-center px12 bg-black/5 w-full min-w-fit">
                <div className="flex w-full py-2 max-w-[1280px]">
                <Sidemenu/>
                <Feed/>
                <Widgets/>
                </div>
            </div>
        </div>

    )
};

export default HomePage;