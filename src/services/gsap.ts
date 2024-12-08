import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
let mm = gsap.matchMedia();

const mainTL = gsap.timeline({
  scrollTrigger: {
    trigger: "#body",
    start: "top top",
    end: "20",
    onEnterBack: () => {
      mm.add("(max-width: 768px)", () => {
        gsap.to("#schedule", {
          duration: 0.2,
          ease: "power1.out",
          top: "45%",
        });
      });

      mainTL.reverse();
    },
  },
});

mainTL
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
  );

mm.add("(max-width: 767px)", () => {
  mainTL
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
  mainTL
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
