"use client";

import { useState, useCallback, useRef, Children, ReactNode } from "react";
import { ChevronLeft, ChevronRight, Circle, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";

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
      className={cn("relative w-full overflow-hidden group", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel Items */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className={cn("w-full flex-shrink-0", itemClassName)}
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
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm disabled:opacity-0"
            disabled={!loop && currentIndex === 0}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-sm disabled:opacity-0"
            disabled={!loop && currentIndex === itemsCount - 1}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && itemsCount > 1 && (
        <div className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 flex space-x-[-20px]">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="p-1 focus:outline-none"
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentIndex ? (
                <CircleDot size={8} className="text-white fill-current" />
              ) : (
                <Circle
                  size={8}
                  className="text-white/60 hover:text-white/80"
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {autoPlay && itemsCount > 1 && (
        <div className="absolute top-0 left-0 w-full h-1 bg-white/20">
          <div
            className="h-full bg-white/60 transition-all duration-300 ease-linear"
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
