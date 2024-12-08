import { gsap } from "gsap";

let mm = gsap.matchMedia();

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

    mm.add("(max-width: 767px)", () => {
      faqTL.to(
        "#footer",
        {
          y: 0,
          duration: 0.2,
        },
        "<+0.2"
      );
    });

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
    mm.add("(max-width: 767px)", () => {
      reversedFaqTL.to(
        "#footer",
        {
          y: "100%",
          duration: 0.2,
        },
        "<"
      );
    });
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
