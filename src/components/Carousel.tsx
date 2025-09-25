"use client";

import { useState, useCallback, useRef, Children, ReactNode } from "react";
import { ChevronLeft, ChevronRight, Circle, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "@/styles/components/carousel.module.css";

interface CarouselProps {
  children: ReactNode;
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  showControls?: boolean;
  loop?: boolean;
  className?: string;
  itemClassName?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  autoPlay = false,
  interval = 5000,
  showArrows = true,
  showDots = true,
  loop = true,
  className = "",
  itemClassName = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const items = Children.toArray(children);
  const itemsCount = items.length;

  const nextSlide = useCallback(() => {
    if (currentIndex === itemsCount - 1 && !loop) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % itemsCount);
  }, [currentIndex, itemsCount, loop]);

  const prevSlide = useCallback(() => {
    if (currentIndex === 0 && !loop) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + itemsCount) % itemsCount);
  }, [currentIndex, itemsCount, loop]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (itemsCount === 0) return null;

  return (
    <div
      className={cn(styles.carousel, "group", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel Items */}
      <div
        className={styles.carouselTrack}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(styles.carouselItem, itemClassName)}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && itemsCount > 1 && (
        <>
          <button
            onClick={prevSlide}
            className={cn(
              styles.navigationButton,
              styles.navigationButtonLeft
            )}
            disabled={!loop && currentIndex === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className={cn(
              styles.navigationButton,
              styles.navigationButtonRight
            )}
            disabled={!loop && currentIndex === itemsCount - 1}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && itemsCount > 1 && (
        <div className={styles.dotsContainer}>
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={styles.dotButton}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentIndex ? (
                <CircleDot size={8} className={cn(styles.dotIcon, styles.dotIconActive)} />
              ) : (
                <Circle
                  size={8}
                  className={styles.dotIcon}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {autoPlay && itemsCount > 1 && (
        <div className={styles.progressContainer}>
          <div
            className={cn(
              styles.progressBar,
              isPaused && styles.progressBarPaused
            )}
            style={{
              width: isPaused ? "100%" : "0%",
              transitionDuration: isPaused ? "0ms" : `${interval}ms`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Carousel;
