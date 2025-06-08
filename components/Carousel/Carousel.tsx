import React, { useState, useEffect, useRef } from'react';
import { gsap } from 'gsap';
import './Carousel.scss';

interface CarouselProps {
  images: { src: string; desc: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween>();

  useEffect(() => {
    animationRef.current = gsap.to({}, {
      duration: 5,
      repeat: -1,
      onRepeat: () => {
        setCurrentIndex(prev => (prev + 1) % images.length);
      }
    });
    return () => animationRef.current?.kill();
  }, [images.length]);

  const handleDotClick = (index: number) => {
    gsap.killTweensOf(animationRef.current);
    setCurrentIndex(index);
    animationRef.current?.restart();
  };

  return (
    <div ref={containerRef} className="carousel">
      {images.map((item, index) => (
        <div
          key={index}
          className={`carousel-item ${index === currentIndex? 'active' : ''}`}
          style={{ backgroundImage: `url(${item.src})` }}
        >
          <div className="mask"></div>
          <p className="carousel-desc">{item.desc}</p>
        </div>
      ))}
      <div className="carousel-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;