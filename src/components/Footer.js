'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Function to preload images
const preloadImages = (imageUrls) => {
  return new Promise((resolve) => {
    let loadedImages = 0;
    const totalImages = imageUrls.length;

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;

      img.onload = () => {
        loadedImages += 1;
        if (loadedImages === totalImages) {
          resolve();
        }
      };

      img.onerror = () => {
        console.error(`Failed to load image: ${url}`);
      };
    });
  });
};

export default function Footer() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Preload images
    const imageUrls = Array.from({ length: 20 }, (_, i) => `/image/image${i + 1}.jpg`);
    preloadImages(imageUrls).then(() => {
      const footerBackground = document.querySelector('.footer-background');

      // Smooth mouse movement with requestAnimationFrame
      const moveBackground = (e) => {
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

      window.addEventListener('mousemove', moveBackground);

      const animateImage = (image) => {
        gsap.fromTo(
          image,
          { opacity: 0, scale: 0.5, z: -500 },
          {
            opacity: 1,
            scale: 0.5,
            z: 950,
            duration: 20,
            ease: 'power3.out',
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
        }, index * 2500);
      });

      return () => {
        window.removeEventListener('mousemove', moveBackground);
      };
    });

  }, []);

  return (
    <footer className="footer-section relative w-full h-screen overflow-hidden bg-black">
      <div className="footer-background absolute top-0 left-0 w-full h-full z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <img
            key={i}
            className={`image image${i + 1} absolute w-[20%] h-[20%] object-cover`}
            src={`/image/image${i + 1}.jpg`}
            alt={`Footer image ${i + 1}`}
            loading="lazy"
            fetchPriority='high'
          />
        ))}
      </div>
      <div className="footer-content relative z-20 text-white text-center flex items-center justify-center w-full h-full">
        <h1 className="text-2xl md:text-[10rem] font-light ">Let's talk</h1>
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
          <p className='hidden md:block' >Gran Vía, 68</p>
          <p className='hidden md:block'>28013</p>
        </div>
        <div className="col-3">
          <p><a href="#" target="_blank">Instagram</a></p>
          <p><a href="#" target="_blank">LinkedIn</a></p>
          <p><a href="#" target="_blank">Twitter</a></p>
        </div>
        <div className="col-4">
          <p>Business inquiries</p>
          <p><a href="#" target="_blank">hello@hanzo.es</a></p>
        </div>
      </div>
    </footer>
  );
}
