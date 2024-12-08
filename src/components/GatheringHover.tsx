import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

// built on this example:
//https://blog.olivierlarose.com/tutorials/magnetic-button
  

interface Particle {
  element: SVGCircleElement;
  x: number;
  y: number;
  radius: number;
  timeline: gsap.core.Timeline;
}

export default function Gathering({children, duration = 1, radius = 1.2, ease = "power.in"}: {children: React.ReactElement, duration?: number, radius?: number, ease?: string}) {
  const gathering = useRef<HTMLElement>(null);
  const particleContainer = useRef<SVGSVGElement | null>(null) as React.MutableRefObject<SVGSVGElement | null>;
  const particles: Particle[] = [];
  
  const createParticle = (mouseX: number, mouseY: number) => {
    if (!gathering.current || !particleContainer.current) return;
    
    const bounds = gathering.current.getBoundingClientRect();
    const centerX = mouseX - bounds.left;
    const centerY = mouseY - bounds.top;
    
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.max(bounds.width, bounds.height) * 1.2;
    const startX = centerX + Math.cos(angle) * distance;
    const startY = centerY + Math.sin(angle) * distance;
    
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("r", (radius*0.5 + Math.random() * radius).toString());
    circle.setAttribute("fill", "white");
    circle.setAttribute("z-index", "-1000");
    particleContainer.current.appendChild(circle);
    
    const tl = gsap.timeline({
      onComplete: () => {
        circle.remove();
        particles.splice(particles.indexOf(particle), 1);
      }
    });
    
    const particle: Particle = {
      element: circle,
      x: startX,
      y: startY,
      radius: Number(circle.getAttribute("r")),
      timeline: tl
    };
    
    tl.set(circle, { x: startX, y: startY, opacity: 0 })
      .to(circle, {
        duration: duration * 0.5 + Math.random() * 0.5,
        x: centerX,
        y: centerY,
        opacity: 0.8,
        ease: ease,
      })
      .to(circle, {
        duration: 0.2,
        opacity: 0,
        scale: 0,
      }, ">");
    
    particles.push(particle);
  };

  useEffect(() => {
    if (!gathering.current) return;
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.pointerEvents = "none";
    gathering.current.style.position = "relative";
    gathering.current.appendChild(svg);
    particleContainer.current = svg;
    
    return () => {
      svg.remove();
    };
  }, []);

  useEffect(() => {
    let particleInterval: ReturnType<typeof setInterval>;
    let lastMouseEvent: MouseEvent;
    
    const mouseEnter = (e: MouseEvent) => {
      lastMouseEvent = e;
      particleInterval = setInterval(() => {
        createParticle(lastMouseEvent.clientX, lastMouseEvent.clientY);
      }, 100);
    }

    const mouseMove = (e: MouseEvent) => {
      lastMouseEvent = e;
    }

    const mouseLeave = () => {
      clearInterval(particleInterval);
    }

    gathering.current?.addEventListener("mouseenter", mouseEnter);
    gathering.current?.addEventListener("mousemove", mouseMove);
    gathering.current?.addEventListener("mouseleave", mouseLeave);
    
    return () => {
      clearInterval(particleInterval);
      gathering.current?.removeEventListener("mouseenter", mouseEnter);
      gathering.current?.removeEventListener("mousemove", mouseMove);
      gathering.current?.removeEventListener("mouseleave", mouseLeave);
    }
  }, [])

  return (
    React.cloneElement(children, {ref: gathering})
  )
}