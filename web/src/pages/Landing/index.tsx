import React, { useEffect, useState } from "react";

import logoImg from "../../assets/images/logo.svg";
import landingImg from "../../assets/images/landing.svg";

import studyIcon from "../../assets/images/icons/study.svg";
import giveClassIcon from "../../assets/images/icons/give-classes.svg";
import purplerHeartIcon from "../../assets/images/icons/purple-heart.svg";

import "./styles.css";
import { Link } from "react-router-dom";
import api from "../../services/api";

const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api
      .get("/connections")
      .then((response) => setTotalConnections(response.data.total));
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Logo" />
          <h2>Su plataforma de estudios online</h2>
        </div>

        <img src={landingImg} alt="landing" className="hero-image" />

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="estudiar" />
            Estudiar
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={giveClassIcon} alt="Dar aulas" />
            Dar aulas
          </Link>
        </div>

        <span className="total-connections">
          Total de {totalConnections} conexiones ya realizadas{" "}
          <img src={purplerHeartIcon} alt="total" />
        </span>
      </div>
    </div>
  );
};

export default Landing;
