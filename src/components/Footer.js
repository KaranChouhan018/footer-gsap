'use client';
import { lazy, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

const videoUrls = [
  'https://player.vimeo.com/external/402519455.sd.mp4?s=71ac425caa2a15557e112fb5991cae266b39ac6d&profile_id=165',
  'https://player.vimeo.com/external/402519477.sd.mp4?s=05d8bb9e04f3a83ca9b0de1844b74221b873ce24&profile_id=165',
  'https://player.vimeo.com/external/402519499.sd.mp4?s=8802d309b6b70e642c3709056264d2686b030709&profile_id=165',
  'https://player.vimeo.com/external/402519518.sd.mp4?s=c6e08fa5f262ad6a4574ee99833ee839c300f07f&profile_id=165',
  'https://player.vimeo.com/external/402519529.sd.mp4?s=34eb92033d422b68f84b966c480efaa80717c032&profile_id=165',
  'https://player.vimeo.com/external/402519561.sd.mp4?s=d50bfd66cde311f27a443eb0cc15377d480abc7f&profile_id=165',
  'https://player.vimeo.com/external/402519598.sd.mp4?s=b8c0929f71690ca4fea53638b4c0407622464b75&profile_id=165',
  // Add more video URLs to the array as needed
];

// Function to handle the mouse move animation
const handleMouseMove = (footerBackground) => (e) => {
  requestAnimationFrame(() => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) * -0.05;
    const moveY = (clientY - window.innerHeight / 2) * -0.05;

    gsap.to(footerBackground, {
      x: moveX,
      y: moveY,
    });
  });
};

export default function Footer() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

const footerBackground = document.querySelector('.footer-background');
const moveBackground = handleMouseMove(footerBackground);
window.addEventListener('mousemove', moveBackground);
const animateMedia = (media, index) => {
  if (!media) return; 
  const type = media.tagName === 'VIDEO' ? 'video' : 'image';
  const animation = gsap.fromTo(
    media,
    { opacity: 0, scale: 0.5, z: -500 },
    {
      opacity:1,
      scale: 0.5,
      z: 950,
      duration: 15,
      delay: 5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.footer-section',
        start: 'top top',
        markers: true,
        toggleActions: 'play none none none',
        id: `media-${index}`, // assign a unique ID to each animation
      },
      onComplete: () => {
        animateNextMedia();
      },
    }
  );
};

const mediaElements = gsap.utils.toArray('.footer-background video, .footer-background img');
let currentIndex = 0;
const animateNextMedia = () => {
  // if (currentIndex === 0) {
  //   animateMedia(mediaElements[currentIndex], currentIndex);
  // } else {
  //   const media = mediaElements[currentIndex];
  //   if (media) {
  //     animateMedia(media, currentIndex);
  //   }
  // }
  currentIndex++;
  if (currentIndex >= mediaElements.length) {
    currentIndex = 0;
  }
  console.log(`Current index: ${currentIndex}`);
};
const staggerDelay = 2500; // adjust the stagger delay as needed
let animationTimeouts = [];
const staggerAnimations = () => {
  mediaElements.forEach((media, index) => {
    if (index === 0) {
      animateMedia(media, index); // animate the first video immediately
    } else {
      setTimeout(() => {
        animateMedia(media, index);
      }, index * staggerDelay);
    }
  });
};

staggerAnimations();

return () => {
  window.removeEventListener('mousemove', moveBackground);
  animationTimeouts.forEach(clearTimeout);
};
  }, []);

  return (
    
    <footer className="footer-section relative w-full h-screen overflow-hidden bg-black">
      <div className="footer-background absolute top-0 left-0 w-full h-full z-10">
      {Array.from({ length: 20 }).map((_, i) => {
       switch (i) {
       case 0:
       case 2:
       case 5:
       case 8:
      return (
        <video
          key={i}
          className={`video video${i + 1} absolute`}
          src={`/video/video${i + 1}.mp4`}
          width={400}
          height={400}
          autoPlay
          loop
          muted
        />
      );

            
            default:
              return (
                <Image
                  key={i}
                  className={`image image${i + 1} absolute`}
                  src={`/image/image${i + 1}.jpg`}
                  alt={`Footer image ${i + 1}`}
                  width={400}
                  height={400}
                  loading="lazy"
                />
              );
          }
        })}
      </div>
      <div className="footer-content relative z-20 text-white text-center flex items-center justify-center w-full h-full">
        <h1 className="text-2xl md:text-[10rem] font-light">Let&apos;s talk</h1> 
      </div>

      {/* New Footer Bar Section */}
      <div className="c-footer-bar grid grid-rows-4 gap-2 p-6 text-white md:grid-cols-4 md:gap-4">
        <div className="col-1">
          <p className="address">
            <span><a href="#" target="_blank">Barcelona</a></span>
          </p>
          <p className="hidden md:block">Gran Vía de les Corts, 682</p>
          <p className="hidden md:block">08010</p>
        </div>
        <div className="col-2">
          <p className="address">
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

