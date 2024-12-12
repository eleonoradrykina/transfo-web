import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
let mm = gsap.matchMedia();

const faqTL = gsap.timeline({ paused: true });
faqTL
  .to(
    "#faq",
    {
      x: "0",
      duration: 0.5,
    },
    "0"
  )
  .to(
    "#hero",
    {
      x: "100%",
      duration: 0.5,
    },
    "0"
  )
  .set(
    ".miefel",
    {
      opacity: 0,
    },
    "0"
  );

const faqButton = document.getElementById("faq__button");
const faqBackButton = document.getElementById("faq__back__button");
if (faqButton) {
  faqButton.addEventListener("click", () => {
    faqTL.restart();
  });
}

if (faqBackButton) {
  faqBackButton.addEventListener("click", () => {
    console.log(faqTL);
    faqTL.reverse();
  });
}

const mainTL = gsap.timeline({
  scrollTrigger: {
    trigger: "#body",
    start: "top top",
    end: "20",
    onEnterBack: () => {
      mainTL.reverse();
      faqTL.reverse();
    },
  },
});

mainTL
  .to(
    "#hero__date",
    {
      marginLeft: "0px",
      duration: 0.5,
    },
    "0"
  )
  .to(
    "#hero__bottom",
    {
      opacity: 0,
      y: 100,
      duration: 0.5,
    },
    "0"
  )
  .to(
    "#faq__button",
    {
      opacity: 1,
      duration: 0.5,
    },
    "0"
  )
  .to(
    ".miefel__hand.right",
    {
      x: "-100%",
      ease: "power2.out",
      duration: 0.5,
    },
    "0"
  )
  .to(
    ".miefel__hand.left",
    {
      x: "100%",
      ease: "power2.out",
      duration: 0.5,
    },
    "0"
  );

mm.add("(max-width: 767px)", () => {
  mainTL
    .to(
      "#hero",
      {
        paddingTop: "10px",
        duration: 0.5,
      },
      "0"
    )
    .to(
      "#hero__title",
      {
        fontSize: "10vw",
        marginLeft: "0px",
        duration: 0.5,
      },
      "0"
    )
    .to(
      "#hero__date",
      {
        fontSize: "0.7rem",
        lineHeight: "1.2rem",
        duration: 0.5,
      },
      "0"
    );
});

mm.add("(min-width: 768px)", () => {
  mainTL
    .to(
      "#hero__top",
      {
        paddingLeft: "30px",
        duration: 0.5,
      },
      "0"
    )
    .to(
      "#hero",
      {
        paddingTop: "60px",
        duration: 0.5,
      },
      "0"
    )
    .to(
      "#hero__title",
      {
        fontSize: "6vw",
        marginLeft: "0px",
        zIndex: 1,
        duration: 0.5,
      },
      "0"
    )
    .to(
      "#footer",
      {
        y: 0,
        duration: 0.25,
      },
      "0.25"
    );
});
