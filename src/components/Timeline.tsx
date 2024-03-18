import { Chrono } from "react-chrono";
import React from "react";
import { Fade } from "react-awesome-reveal";
const Timeline = () => {
  return (
    <Fade>
      <Chrono
        items={[
          {
            title: "2023 - 2024",
            cardTitle: "Ma Question Medicale",
            cardSubtitle: `Stage en développement web et IOT de validation de fin de Bachelor 2`,
          },
          {
            title: "2022 - 2025",
            cardTitle: "Lyon Ynov Campus",
            cardSubtitle: `Bachelor Informatique`,
          },
          {
            title: "2020 - 2022",
            cardTitle: "Lycée Victor Hugo",
            cardSubtitle: `Baccalauréat STI2D option SIN`,
          },
          {
            title: "2018",
            cardTitle: "Flexio",
            cardSubtitle: "Stage d'initiation à la programmation",
          },
        ]}
        cardHeight={100}
        mode="VERTICAL_ALTERNATING"
        theme={{
          primary: "#122675",
          secondary: "#3d4b80",
          cardBgColor:
            "linear-gradient(208.84deg, rgba(9, 21, 67, 0.5) 17.75%, #101B44 74.01%)",
          titleColor: "white",
          textColor: "white",
          cardTitleColor: "white",
          detailsColor: "white",
          cardSubtitleColor: "rgba(255, 255, 255, 0.8)",
          titleColorActive: "white",
        }}
      />
    </Fade>
  );
};

export default Timeline;
