import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
let mm = gsap.matchMedia();

const faqButton = document.getElementById("faq__button");
const faqBackButton = document.getElementById("faq__back__button");
if (faqButton) {
  faqButton.addEventListener("click", () => {
    const faqTL = gsap.timeline({ paused: true, autoRemoveChildren: true });
    faqTL
      .to("#faq", {
        x: "0",
      })
      .to(
        "#hero",
        {
          x: "100%",
        },
        "<"
      )
      .set(
        ".miefel",
        {
          opacity: 0,
        },
        "<"
      );
    faqTL.play();
  });
}

if (faqBackButton) {
  faqBackButton.addEventListener("click", () => {
    const revertTL = gsap.timeline({ paused: true, autoRemoveChildren: true });
    revertTL
      .to("#faq", {
        x: "-100%",
      })
      .to(
        "#hero",
        {
          x: "0",
        },
        "<"
      )
      .set(
        ".miefel",
        {
          opacity: 1,
        },
        ">"
      );
    revertTL.play();
  });
}

const mainTL = gsap.timeline({
  scrollTrigger: {
    trigger: "#body",
    start: "top top",
    end: "20",
    onEnterBack: () => {
      mainTL.reverse();
      const revertTL = gsap.timeline({
        paused: true,
        autoRemoveChildren: true,
      });
      revertTL
        .to("#faq", {
          x: "-100%",
        })
        .to(
          "#hero",
          {
            x: "0",
          },
          "<"
        )
        .set(
          ".miefel",
          {
            opacity: 1,
          },
          ">"
        );
      revertTL.play();
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
  .to(
    "#faq__button",
    {
      opacity: 1,
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
        zIndex: 1,
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
