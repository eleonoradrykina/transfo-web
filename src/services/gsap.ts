import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mainTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".main",
    start: "top top",
    end: "+=500",
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

mainTL.play();
