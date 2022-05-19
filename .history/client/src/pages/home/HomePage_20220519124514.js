import React from "react";
import Headbar from "../../components/headbar/Headbar";
import Sidemenu from "../../components/sidemenu/Sidemenu";
import Widgets from "../../components/widgets/Widgets";
import Feed from "../../components/feed/Feed";
import Header from "../../components/header/Header";

import  useFetch  from "../../contexts/FetchContext";



const HomePage = () => {


    return (
    <>
            <div className="flex justify-center px12 bg-black/5 w-full min-w-fit">
                <div className="flex w-full py-2 max-w-[1280px]">
                <Header/>
                <Feed/>
                <Widgets/>
                </div>
            </div>
    </>

    )
};

export default HomePage;