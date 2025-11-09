"use client";

import LogoLoop from "../LogoLoop";
// import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

// const techLogos = [
//   // { node: <SiReact />, title: "React", href: "https://react.dev" },
//   // { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
//   // { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
//   // { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
// ];

// Alternative with image sources
const imageLogos = [
  { src: "/images/partner/Logo-stikesnotokusumo.png", alt: "Company 1" },
  { src: "/images/partner/Logo-kementrian.png", alt: "Company 2" },
  { src: "/images/partner/Logo-puskesmas.png", alt: "Company 3" },
  { src: "/images/partner/Logo-mdyy.png", alt: "Company 3" },
  { src: "/images/partner/Logo-diktisaintek.png", alt: "Company 3" },
];

export default function App() {
  return (
    <div style={{ height: "100px", position: "relative", overflow: "hidden" }}>
      <LogoLoop
        logos={imageLogos}
        speed={100}
        direction="left"
        logoHeight={80}
        gap={70}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Technology partners"
      />
    </div>
  );
}
