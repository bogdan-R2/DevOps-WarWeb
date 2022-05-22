import "./styles.css";
import "./LandingPageStyling.css";
import { Link, useNavigate } from "react-router-dom";
import LandingNav from "../../components/landing-page-nav/LandingNav";

const LandingPage = () => {
    const navigate = useNavigate();

    function handleClick(e) {
        navigate("/signup")
    }
  return (
      <>  
    <LandingNav/>
    <section className="HeroSec">
      <div className="contentWrapper">
        <div className="leftContent">
        <h2>Do you want to help or need help?</h2>
        <button type="button" className="btn btn-info btn-lg " onClick={handleClick}>Register Now</button>
        </div>
        <div className="rigthContent">
          <div className="heroImg">
            <img src={require('../../assets/img/peace-landing.jpg')} alt="draw with healthy calcule" />
          </div>
        </div>
      </div>
    </section>


</>
  );
};

export default LandingPage;