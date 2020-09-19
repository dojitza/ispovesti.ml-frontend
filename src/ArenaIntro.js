import React, { useState, useEffect } from "react";

import robotivs from "./static/robotivs5.png";

export const ArenaIntro = (props) => {
  const { handleEnterArenaClick } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <img style={{ objectFit: "contain" }} src={robotivs} alt="Arena" />
      <div
        style={{
          fontSize: "larger",
          fontWeight: "bold",
          background: "rgba(0,0,0,0.4)",
          borderRadius: 10,
          padding: 10,
        }}
      >
        Dobrodošli u arenu! Ovde odlučujete o sudbini robotovih ispovesti. Ako
        vam se ispovest sviđa, svajpujte desno (pritisnite srce), ako vam se
        ispovest ne sviđa svajpujte levo (pritisnite x), a ako vam se ispovest
        posebno dopada, možete da ju superlajkujte (pritisnite zvezdu). No
        pazite! Svaki dan dodeljen vam je tek jedan superlajk, pazite kako ćete
        da ga utrošite! Prijatno.
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          title="U Arenu"
          className="button"
          onClick={() => handleEnterArenaClick()}
          style={{
            display: "inline-block",
            fontSize: 36,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            color: "lightGray",
          }}
        >
          U arenu
        </button>
      </div>
    </div>
  );
};
