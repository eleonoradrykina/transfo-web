import { useEffect, useState } from "react";
import "../styles/components/miefel.css";
import { gsap } from "gsap";

const Miefel = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);

      gsap.to(".miefel__hand.right", {
        duration: 0.2,
        x: e.clientX / 7,
        y: e.clientY / 7,
        rotate: e.clientX / 100 + e.clientY / 100,
        ease: "power4.out",
      });

      gsap.to(".miefel__hand.left", {
        duration: 0.2,
        x: -e.clientX / 7,
        y: e.clientY / 7,
        rotate: -e.clientX / 100 + e.clientY / 100,
        ease: "power4.out",
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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
