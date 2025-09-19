"use client";
import ContentLayout from "@/components/ContentLayout";
import AvailableServices, { Service } from "@/components/AvailableServices";
import React, { useEffect } from "react";
import { useAppStore } from "@/store/app-store";
import Wallet from "@/components/Wallet";
import CarouselItem from "@/components/CarouselItem";
import Carousel from "@/components/Carousel";

export default function HomePage() {
  const { setLoading } = useAppStore();
  const [services, setServices] = React.useState<Service[]>([]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setServices([
        { icon: "📱", name: "Mobile" },
        { icon: "📺", name: "DTH" },
        { icon: "💡", name: "Electricity" },
        { icon: "🚗", name: "FasTag" },
        { icon: "▶️", name: "Play" },
        { icon: "🛡️", name: "Insurance" },
        { icon: "💸", name: "EMI" },
        { icon: "👀", name: "See All" },
      ]);

      setLoading(false);
    }, 1000);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [setLoading]);

  return (
    <ContentLayout>
      <Carousel
        autoPlay
        loop={true}
        interval={5000}
        showControls={false}
        showArrows={false}
        className="rounded-2xl shadow-xl overflow-hidden mb-4"
        itemClassName="h-full"
      >
        <CarouselItem>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-full flex flex-col items-center justify-center text-white p-6 text-center">
            <h3 className="text-2xl font-bold mb-2">Special Offer! 🎉</h3>
            <p className="text-lg mb-4">
              Get 10% cashback on all credit card payments
            </p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Claim Offer
            </button>
          </div>
        </CarouselItem>

        <CarouselItem>
          <div className="bg-gradient-to-r from-green-500 to-teal-600 h-full flex flex-col items-center justify-center text-white p-6 text-center">
            <h3 className="text-2xl font-bold mb-2">Zero Fees! 💰</h3>
            <p className="text-lg mb-4">
              No transaction fees for the first month
            </p>
            <button className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Get Started
            </button>
          </div>
        </CarouselItem>

        <CarouselItem>
          <div className="bg-gradient-to-r from-orange-500 to-red-600 h-full flex flex-col items-center justify-center text-white p-6 text-center">
            <h3 className="text-2xl font-bold mb-2">Instant Transfers! ⚡</h3>
            <p className="text-lg mb-4">
              24/7 bank transfers with zero downtime
            </p>
            <button className="bg-white text-orange-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Try Now
            </button>
          </div>
        </CarouselItem>
      </Carousel>
      <Wallet />
      <AvailableServices services={services} />
    </ContentLayout>
  );
}
