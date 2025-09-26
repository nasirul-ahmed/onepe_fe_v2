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
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
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

  // Helper function to calculate drag offset with better sensitivity
  const calculateDragOffset = (startX: number, currentX: number) => {
    const diff = startX - currentX;
    const containerWidth = containerRef.current?.offsetWidth || 0;
    // Add some resistance at the edges for better feel
    const dragPercentage = (diff / containerWidth) * 100;
    return Math.max(-150, Math.min(150, dragPercentage)); // Limit drag range
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling on touch start
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !touchStartX.current) return;

    e.preventDefault(); // Prevent page scroll during drag
    touchEndX.current = e.touches[0].clientX;
    const offset = calculateDragOffset(touchStartX.current, touchEndX.current);
    setDragOffset(offset);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!touchStartX.current || !touchEndX.current) {
      setIsDragging(false);
      setDragOffset(0);
      setIsPaused(false);
      return;
    }

    const diff = touchStartX.current - touchEndX.current;
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const swipeThreshold = containerWidth * 0.15; // Reduced threshold for easier swiping

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setIsDragging(false);
    setDragOffset(0);
    setIsPaused(false);
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (itemsCount === 0) return null;

  return (
    <div
      ref={containerRef}
      className={cn(styles.carousel, "group", className, "w-full")}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={
        { "--carousel-current-index": currentIndex, } as React.CSSProperties
      }
    >
      {/* Carousel Items */}
      <div
        className={styles.carouselTrack}
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${
            isDragging ? -dragOffset : 0
          }%))`,
          transition: isDragging ? "none" : undefined,
        }}
      >
        {items.map((item, index) => (
          <div key={index} className={cn(styles.carouselItem, itemClassName)}>
            {item}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && itemsCount > 1 && (
        <>
          <button
            onClick={prevSlide}
            className={cn(styles.navigationButton, styles.navigationButtonLeft)}
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
                <CircleDot
                  size={8}
                  className={cn(styles.dotIcon, styles.dotIconActive)}
                />
              ) : (
                <Circle size={8} className={styles.dotIcon} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
