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
      <img
        style={{ objectFit: "contain", marginTop: -25 }}
        src={robotivs}
        alt="Arena"
      />
      <div
        style={{
          fontSize: "normal",
          fontWeight: "bold",
          background: "rgba(0,0,0,0.4)",
          borderRadius: 10,
          padding: 10,
        }}
      >
        Dobrodošli u arenu! Ovde odlučujete o sudbini robotovih ispovesti.
        Ispovesti možete da lajkujete, dislajkujete i superlajkujete. No pazite!
        Superlajk vredi više i svaki dan dodeljen vam je tek jedan, pazite kako
        ćete da ga utrošite! Prijatno.
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
