import React, { useState } from "react";
import howToUseApp from "./howToUse.js";

const Aboutus = () => {
  const [aboutData, setAboutData] = useState(howToUseApp);
  return (
    <>
      <section className="common-section our-services">
        <div className="container mb-5">
          <div className="row">
            {/* 1section right side data  */}
            <div className="col-12 col-lg-7 our-services-list">
              <h3 className="mini-title">
              </h3>
              <h1 className="main-heading">How to use the App?</h1>
              <h3 className="mini-title">
              </h3>
              <br>
              </br>
              {aboutData.map((curElem) => {
                const { id, title, info } = curElem;
                return (
                  <>
                    <div className="row our-services-info" key={id}>
                      <div className="col-10 our-services-data">
                        <h2>{title}</h2>
                        <p className="main-hero-para">{info}</p>
                      </div>
                    </div>
                  </>
                );
              })}

              <br />
            </div>
          </div>
        </div>
      </section>
      <section className="common-section our-services our-services-rightside">
        <div className="container mb-5">
          <div className="row">
            {/* 1section right side data  */}
            <div className="col-12 col-lg-7 our-services-rightside-content d-flex justify-content-center align-items-start flex-column">
              <h1 className="main-heading">
                Support is available 24/7
              </h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Aboutus;