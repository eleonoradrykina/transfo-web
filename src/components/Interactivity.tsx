import { useEffect, useState } from "react";
import Map from "./Map";
import Schedule from "./Schedule";
import { BUILDING, type IEvent } from "../services/types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Props {
  events: IEvent[];
  copy: any;
}

const Interactivity = ({ events, copy }: Props) => {
  gsap.registerPlugin(ScrollTrigger);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [selectedEvent] = useState<string | null>(
    urlParams.get("event") ?? null
  );

  const [timeline] = useState<gsap.core.Timeline>(
    gsap.timeline({
      duration: 1,
      scrollTrigger: {
        trigger: "#body",
        start: "top top",
        end: "20",
        onEnterBack: () => {
          timeline.reverse();
        },
      },
    })
  );

  useEffect(() => {
    if (urlParams.get("building")) {
      if (
        Object.values(BUILDING).includes(urlParams.get("building") as BUILDING)
      ) {
        window.scrollTo(0, document.body.scrollHeight);
        setSelectedBuilding(urlParams.get("building") ?? null);
      } else {
        window.history.replaceState({}, document.title, "/");
      }
    }

    let mm = gsap.matchMedia();

    timeline
      .to(
        "#hero__date",
        {
          marginLeft: "0px",
        },
        "<"
      )
      .to(
        "#hero__bottom",
        {
          opacity: 0,
          y: 100,
        },
        "<"
      )
      .from(
        "#faq__button",
        {
          opacity: 0,
        },
        "<"
      )
      .to(
        ".miefel__hand.right",
        {
          x: "-100%",
          ease: "power2.out",
        },
        "<"
      )
      .to(
        ".miefel__hand.left",
        {
          x: "100%",
          ease: "power2.out",
        },
        "<"
      );

    mm.add("(max-width: 767px)", () => {
      timeline
        .to(
          "#hero",
          {
            paddingTop: "10px",
          },
          "<"
        )
        .to(
          "#hero__title",
          {
            fontSize: "10vw",
            marginLeft: "0px",
          },
          "<"
        )
        .to(
          "#hero__date",
          {
            fontSize: "0.7rem",
            lineHeight: "1.2rem",
          },
          "<"
        );
    });

    mm.add("(min-width: 768px)", () => {
      timeline
        .to(
          "#hero__top",
          {
            paddingLeft: "30px",
          },
          "<"
        )
        .to(
          "#hero",
          {
            paddingTop: "60px",
          },
          "<"
        )
        .to(
          "#hero__title",
          {
            fontSize: "6vw",
            marginLeft: "0px",
          },
          "<"
        )
        .to(
          "#footer",
          {
            y: 0,
            duration: 0.2,
          },
          "<+0.2"
        );
    });
  }, []);

  return (
    <div className="interactivity">
      <Map
        timeline={timeline}
        copy={copy}
        initialBuilding={selectedBuilding}
        onChangeBuilding={setSelectedBuilding}
      />
      <Schedule
        timeline={timeline}
        copy={copy}
        events={events}
        initialBuilding={selectedBuilding}
        initialEvent={selectedEvent}
        onChangeBuilding={setSelectedBuilding}
      />
    </div>
  );
};
export default Interactivity;
