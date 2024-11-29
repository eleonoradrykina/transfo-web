import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

mainTL.to(".hero__title", {
  //scale: 0.7,
  fontSize: "7vw",
  marginLeft: "0px",
});
mainTL.to(
  ".hero__date",
  {
    marginLeft: "0px",
  },
  "<"
);
mainTL.to(
  ".hero",
  {
    paddingTop: "15px",
  },
  "<"
);

mainTL.to(".hero__top", {}, "<");
