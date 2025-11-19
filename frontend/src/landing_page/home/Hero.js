import React from "react";

function Hero() {
  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <img
          src="/Media/homeHero.png"
          alt="Investment platform dashboard"
          className="mb-5 img-fluid"
          style={{ maxWidth: "100%", height: "auto" }}
        />

        <h1 className="mt-5">Invest in everything</h1>
        <p>
          Online platform to invest in stocks, derivatives, mutual funds, and
          more
        </p>
      </div>
    </div>
  );
}

export default Hero;
