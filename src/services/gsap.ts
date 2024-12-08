import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
let mm = gsap.matchMedia();

const faqTL = gsap.timeline({ paused: true, autoRemoveChildren: true });
// const reversedFaqTL = gsap.timeline({
//   paused: true,
//   autoRemoveChildren: true,
// });

const setupFaqTL = () => {
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
    )
    .to(
      ".map",
      {
        opacity: 0,
        duration: 1,
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
};
// const setupReversedFaqTL = (scroll = false) => {
//   mm.add("(max-width: 767px)", () => {
//     reversedFaqTL.to(
//       "#footer",
//       {
//         y: "100%",
//         duration: 0.2,
//       },
//       "<"
//     );
//   });
//   mm.add("(min-width: 768px)", () => {
//     reversedFaqTL.to("#faq__back__button", {
//       y: 10,
//       opacity: 0,
//       duration: 1,
//       ease: "power2.out",
//     });
//   });
//   reversedFaqTL
//     .to(
//       ".map",
//       {
//         opacity: 100,
//         duration: 1,
//       },
//       "<"
//     )
//     .to(
//       "#hero__title",
//       {
//         x: "0",
//         duration: 1,
//         ease: "power2.out",
//       },
//       "<+0.1"
//     )
//     .to(
//       "#hero__date",
//       {
//         x: "0",
//         duration: 1,
//         ease: "power2.out",
//       },
//       "<"
//     )
//     .to(
//       "#faq__button",
//       {
//         x: "0",
//         duration: 1,
//         ease: "power2.out",
//       },
//       "<"
//     )
//     .to(
//       "#faq",
//       {
//         x: "-100%",
//         duration: 1,
//         ease: "power2.out",
//       },
//       "<"
//     );
//   if (!scroll) {
//     reversedFaqTL.to(
//       "#schedule",
//       {
//         y: "0",
//         duration: 1,
//         ease: "power2.out",
//       },
//       "<0.2"
//     );
//   }
// };

const faqButton = document.getElementById("faq__button");
const faqBackButton = document.getElementById("faq__back__button");
if (faqButton) {
  faqButton.addEventListener("click", () => {
    // reversedFaqTL.clear();
    setupFaqTL();
    faqTL.play();
  });
}

if (faqBackButton) {
  faqBackButton.addEventListener("click", () => {
    setupFaqTL();
    faqTL.reverse();
    // setupReversedFaqTL();
    // reversedFaqTL.play();
  });
}

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
      setupFaqTL();
      faqTL.reverse();
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
  // .to(
  //   "#scroll-trigger",
  //   {
  //     bottom: "40%",
  //     top: "50px",
  //   },
  //   ">"
  // );
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
