'use client';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';

const animateMedia = (media, index, animateNextMedia) => {
  if (!media) return;
  const animation = gsap.fromTo(
    media,
    { opacity: 0, scale: 0.5, z: -500 },
    {
      opacity: 1,
      scale: 0.5,
      z: 950,
      duration: 10,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.footer-section',
        start: 'top top',
        markers: true,
        toggleActions: 'play none none none',
        id: `media-${index}`,
      },
      onComplete: () => {
        animateNextMedia();
      },
    }
  );
};

const handleMouseMove = (footerBackgroundRef) => (e) => {
  const { clientX, clientY } = e; // Get mouse position

  // Calculate movement values (adjust factor to control intensity)
  const moveX = (clientX - window.innerWidth / 2) * -0.05; // Negative for opposite direction
  const moveY = (clientY - window.innerHeight / 2) * -0.05; // Negative for opposite direction

  // Apply the movement to the background using GSAP
  gsap.to(footerBackgroundRef.current, {
    x: moveX,
    y: moveY,
    duration: 0.5, // Duration of the movement
    ease: 'power1.out' // Smooth easing for the effect
  });
};

export default function Footer() {
  const footerBackgroundRef = useRef(null);
  const currentIndexRef = useRef(0);
  const animationTimeoutsRef = useRef([]);

  const moveBackground = useCallback(handleMouseMove(footerBackgroundRef), []);

  const animateNextMedia = useCallback(() => {
    const mediaElements = gsap.utils.toArray('.footer-background video, .footer-background img');
    const media = mediaElements[currentIndexRef.current];
    if (media) {
      animateMedia(media, currentIndexRef.current, animateNextMedia);
    }
    currentIndexRef.current++;
    if (currentIndexRef.current >= mediaElements.length) {
      currentIndexRef.current = 0;
    }
    console.log(`Current index: ${currentIndexRef.current}`);
  }, []);

  const staggerAnimations = useCallback(() => {
    const mediaElements = gsap.utils.toArray('.footer-background video, .footer-background img');
    const staggerDelay = 4000;
    mediaElements.forEach((media, index) => {
      if (index === 0) {
        animateMedia(media, index, animateNextMedia);
      } else {
        animationTimeoutsRef.current.push(
          setTimeout(() => {
            animateMedia(media, index, animateNextMedia);
          }, index * staggerDelay)
        );
      }
    });
  }, [animateNextMedia]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    window.addEventListener('mousemove', moveBackground);
    staggerAnimations();

    return () => {
      window.removeEventListener('mousemove', moveBackground);
      animationTimeoutsRef.current.forEach(clearTimeout);
    };
  }, [moveBackground, staggerAnimations]);


  return (
    <footer className="footer-section relative w-full h-screen overflow-hidden bg-black">
      <div ref={footerBackgroundRef} className="footer-background absolute top-0 left-0 w-full h-full z-10">
        {Array.from({ length: 20 }).map((_, i) => {
          switch (i) {
            case 0:
            case 2:
            case 5:
            case 8:
            case 10:
            case 14:
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
                  preload="auto"
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
      <div className="c-footer-bar grid grid-rows-4 md:grid-cols-4 gap-2 md:gap-4 p-6 text-white">
        <div className="col-1">
          <p className="address">
            <svg width="11px" height="15px" viewBox="0 0 11 15" xmlns="http://www.w3.org/2000/svg">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g>
                  <g>
                    <path d="M5.5,0.6156 C4.15,0.6156 2.93,1.175 2.05,2.0779 C1.16,2.985 0.6156,4.240 0.6156,5.625 C0.6156,7.527 2.29,10.330 5.5,14.0607 C8.7067,10.3304 10.3844,7.5278 10.3844,5.625 C10.3844,4.240 9.8365,2.9857 8.9489,2.0779 C8.0663,1.175 6.8472,0.6156 5.5,0.6156 Z" stroke="#FFFFFF" strokeWidth="1.2312"></path>
                    <ellipse fill="#FFFFFF" fillRule="evenodd" cx="5.5" cy="5.625" rx="1" ry="1"></ellipse>
                  </g>
                </g>
              </g>
            </svg>
            <span><a href="#" target="_blank">Barcelona</a></span>
          </p>
          <p className='hidden md:block'>Gran Vía de les Corts, 682</p>
          <p className='hidden md:block'>08010</p>
        </div>
        <div className="col-2">
          <p className="address">
            <svg width="11px" height="15px" viewBox="0 0 11 15" xmlns="http://www.w3.org/2000/svg">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g>
                  <g>
                    <path d="M5.5,0.6156 C4.15,0.6156 2.93,1.175 2.05,2.0779 C1.16,2.985 0.6156,4.240 0.6156,5.625 C0.6156,7.527 2.29,10.330 5.5,14.0607 C8.7067,10.3304 10.3844,7.5278 10.3844,5.625 C10.3844,4.240 9.8365,2.9857 8.9489,2.0779 C8.0663,1.175 6.8472,0.6156 5.5,0.6156 Z" stroke="#FFFFFF" strokeWidth="1.2312"></path>
                    <ellipse fill="#FFFFFF" fillRule="evenodd" cx="5.5" cy="5.625" rx="1" ry="1"></ellipse>
                  </g>
                </g>
              </g>
            </svg>
            <span><a href="#" target="_blank">Madrid</a></span>
          </p>
          <p className='hidden md:block'>Gran Vía, 68</p>
          <p className='hidden md:block'>28013</p>
        </div>
        <div className="col-3">
          <p><a href="#" target="_blank">Instagram</a></p>
          <p><a href="#" target="_blank">LinkedIn</a></p>
          <p><a href="#" target="_blank">Twitter</a></p>
        </div>
        <div className="col-4">
          <p>Business inquiries</p>
          <p>
            <a href="mailto:hello@hanzo.es" target="_blank">
              hello@hanzo.es
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}