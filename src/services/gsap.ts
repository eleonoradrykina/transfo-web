import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
let mm = gsap.matchMedia();

const mainTL = gsap.timeline({
  scrollTrigger: {
    trigger: "#body",
    start: "top top",
    end: "bottom bottom",
    scrub: 1,
    markers: {
      startColor: "white",
      endColor: "white",
      fontSize: "18px",
      fontWeight: "bold",
      indent: 20,
    },
  },
});

mainTL.to(
  "#hero__date",
  {
    marginLeft: "0px",
  },
  "<"
);

mm.add("(max-width: 767px)", () => {
  mainTL.to(
    "#hero",
    {
      paddingTop: "10px",
    },
    "<"
  );

  mainTL.to(
    "#hero__title",
    {
      fontSize: "10vw",
      marginLeft: "0px",
    },
    "<"
  );

  mainTL.to(
    "#hero__date",
    {
      fontSize: "0.7rem",
      lineHeight: "1.2rem",
    },
    "<"
  );
});

mm.add("(min-width: 768px)", () => {
  mainTL.to(
    "#hero",
    {
      paddingTop: "15px",
    },
    "<"
  );

  mainTL.to(
    "#hero__title",
    {
      fontSize: "7vw",
      marginLeft: "0px",
    },
    "<"
  );
});

mainTL.to(
  "#hero__bottom",
  {
    opacity: 0,
    y: 100,
  },
  "<"
);

mainTL.to(".hero__top", {}, "<");
