'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

// Function to handle the mouse move animation
const handleMouseMove = (footerBackground) => (e) => {
  requestAnimationFrame(() => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) * -0.05;
    const moveY = (clientY - window.innerHeight / 2) * -0.05;

    gsap.to(footerBackground, {
      x: moveX,
      y: moveY,
      duration: 0.5,
      ease: 'power1.out',
    });
  });
};

export default function Footer() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const footerBackground = document.querySelector('.footer-background');
    const moveBackground = handleMouseMove(footerBackground);
    
    window.addEventListener('mousemove', moveBackground);

    const animateImage = (image) => {
      gsap.fromTo(
        image,
        { opacity: 0, scale: 0.5, z: -600 },
        {
          opacity: 1,
          scale: 0.5,
          z: 950,
          duration: 10,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.footer-section',
            start: 'top top',
            markers:true,
            toggleActions: 'play none none none',
          },
          onComplete: () => animateImage(image),
        }
      );
    };

    const images = gsap.utils.toArray('.footer-background img');

    images.forEach((image, index) => {
      setTimeout(() => {
        animateImage(image);
      }, index * 2000);
    });

    return () => {
      window.removeEventListener('mousemove', moveBackground);
    };
  }, []);

  return (
    <footer className="footer-section relative w-full h-screen overflow-hidden bg-black">
      <div className="footer-background absolute top-0 left-0 w-full h-full z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <Image
            key={i}
            className={`image image${i + 1} absolute`}
            src={`/image/image${i + 1}.jpg`}
            alt={`Footer image ${i + 1}`}
            width={400}
            height={400}
            loading='lazy'
          />
        ))}
      </div>
      <div className="footer-content relative z-20 text-white text-center flex items-center justify-center w-full h-full">
        <h1 className="text-2xl md:text-[10rem] font-light">Let&apos;s talk</h1> 
      </div>

      {/* New Footer Bar Section */}
      <div className="c-footer-bar grid grid-rows-4 gap-2 p-6 text-white md:grid-cols-4 md:gap-4">
  <div className="col-1">
    <p className="address">
      {/* SVG icon */}
      <span><a href="#" target="_blank">Barcelona</a></span>
    </p>
    <p className="hidden md:block">Gran Vía de les Corts, 682</p>
    <p className="hidden md:block">08010</p>
  </div>
  <div className="col-2">
    <p className="address">
      {/* SVG icon */}
      <span><a href="#" target="_blank">Madrid</a></span>
    </p>
    <p className="hidden md:block">Gran Vía, 68</p>
    <p className="hidden md:block">28013</p>
  </div>
  <div className="col-3">
    <p><a href="#" target="_blank">Instagram</a></p>
    <p><a href="#" target="_blank">LinkedIn</a></p>
    <p><a href="#" target="_blank">Twitter</a></p>
  </div>
  <div className="col-4">
    <p>Business inquiries</p>
    <p><a href="mailto:hello@hanzo.es" target="_blank">hello@hanzo.es</a></p>
  </div>
</div>

    </footer>
  );
}
