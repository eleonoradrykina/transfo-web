import { useEffect, useState } from "react";
import "../styles/components/miefel.css";
import { gsap } from "gsap";

const Miefel = () => {
  const [leftHandRotate, setLeftHandRotate] = useState(-20);
  const [rightHandRotate, setRightHandRotate] = useState(35);

  const moveHands = () => {
    const newLeft =
      leftHandRotate + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 10;
    const newRight =
      rightHandRotate + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 10;

    const randomDelay = Math.random() * 3;
    const randomDelay2 = Math.random() * 3;
    const deltaLeft = Math.abs(newLeft - leftHandRotate);
    const deltaRight = Math.abs(newRight - rightHandRotate);

    setLeftHandRotate(newLeft);
    setRightHandRotate(newRight);
    gsap.to(".miefel__hand.right", {
      duration: 3 + deltaRight / 2,
      rotate: newRight,
      delay: randomDelay,
      // onComplete: () => {
      //   console.log("----RIGHT----");
      //   console.log("rotation", newRight);
      //   console.log("difference", deltaRight);
      //   console.log("duration", 5 + deltaRight / 2);
      //   console.log("delay", randomDelay);
      //   console.log("time", 5 + deltaRight / 2 + randomDelay);
      // },
    });
    gsap.to(".miefel__hand.left", {
      duration: 3 + deltaLeft / 2,
      rotate: newLeft,
      delay: randomDelay2,
      // onComplete: () => {
      //   console.log("----LEFT----");
      //   console.log("rotation", newLeft);
      //   console.log("difference", deltaLeft);
      //   console.log("duration", 5 + deltaLeft / 2);
      //   console.log("delay", randomDelay2);
      //   console.log("time", 5 + deltaLeft / 2 + randomDelay2);
      // },
    });
  };

  useEffect(() => {
    moveHands();
    let repeater = setInterval(moveHands, 10000);

    const miefelTL = gsap.timeline({
      scrollTrigger: {
        trigger: "#body",
        start: "top top",
        end: "20",
        onEnterBack: () => {
          moveHands();
          repeater = setInterval(moveHands, 10000);
          miefelTL.reverse();
        },
      },
      onComplete: () => {
        clearInterval(repeater);
      },
    });

    miefelTL
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

    return () => {
      clearInterval(repeater);
    };
  }, []);

  return (
    <div className="miefel">
      <img
        className="miefel__hand right"
        src="/miefel/character-hand-right.png"
      />
      <img
        className="miefel__hand left"
        src="/miefel/character-hand-left.png"
      />
    </div>
  );
};
export default Miefel;
