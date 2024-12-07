import { gsap } from "gsap";
import { BUILDING } from "../services/types";

let mm = gsap.matchMedia();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.get("building")) {
  if (Object.values(BUILDING).includes(urlParams.get("building") as BUILDING)) {
    window.scrollTo(0, document.body.scrollHeight);
  } else {
    window.history.replaceState({}, document.title, "/");
  }
}

const faqTL = gsap.timeline({ paused: true, autoRemoveChildren: true });
const reversedFaqTL = gsap.timeline({
  paused: true,
  autoRemoveChildren: true,
  scrollTrigger: {
    trigger: "#body",
    start: "bottom bottom",
    end: "20",
  },
});
const faqButton = document.getElementById("faq__button");
const faqBackButton = document.getElementById("faq__back__button");
if (faqButton) {
  faqButton.addEventListener("click", () => {
    reversedFaqTL.clear();
    faqTL
      .to("#schedule", {
        y: "100%",
        duration: 0.5,
        ease: "power2.out",
      })
      .to(
        "#hero__title",
        {
          x: "100vw",
          duration: 1,
          ease: "power2.out",
        },
        "<+0.1"
      )
      .to(
        "#hero__date",
        {
          x: "100vw",
          duration: 1,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        "#faq__button",
        {
          x: "100vw",
          duration: 1,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        "#faq",
        {
          x: "0",
          duration: 1,
          ease: "power2.out",
        },
        "<"
      );

    mm.add("(min-width: 768px)", () => {
      faqTL.to(
        "#faq__back__button",
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        "<0.5"
      );
    });

    faqTL.play();
  });
}

if (faqBackButton) {
  faqBackButton.addEventListener("click", () => {
    faqTL.clear();
    mm.add("(min-width: 768px)", () => {
      reversedFaqTL.to("#faq__back__button", {
        y: 10,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    });
    reversedFaqTL
      .to(
        "#hero__title",
        {
          x: "0",
          duration: 1,
          ease: "power2.out",
        },
        "<+0.1"
      )
      .to(
        "#hero__date",
        {
          x: "0",
          duration: 1,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        "#faq__button",
        {
          x: "0",
          duration: 1,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        "#faq",
        {
          x: "-100%",
          duration: 1,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        "#schedule",
        {
          y: "0",
          duration: 1,
          ease: "power2.out",
        },
        "<0.2"
      );
    reversedFaqTL.play();
  });
}
