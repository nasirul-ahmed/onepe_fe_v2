"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { RouteUtils } from "@/config/routes";
import Card from "./Card";

export interface Service {
  icon: string;
  name: string;
  isPopular?: boolean;
  discount?: string;
}

interface AvailableServicesProps {
  services: Service[];
}

const AvailableServices = (props: AvailableServicesProps) => {
  const { services } = props;
  const router = useRouter();

  const getServiceRoute = (serviceName: string) => {
    return RouteUtils.getServiceRoute(serviceName);
  };

  const handleServiceClick = (serviceName: string) => {
    router.push(getServiceRoute(serviceName));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-on-surface">
          Bill Payments & Services
        </h2>

        <button
          onClick={() => router.push("/services")}
          className="text-primary text-sm font-medium"
        >
          View All
        </button>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-4 gap-3"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleServiceClick(service.name)}
          >
            <Card
              variant="default"
              padding="sm"
              className="relative flex flex-col items-center justify-center h-20 cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 border border-slate-200 dark:border-slate-600"
            >
              {service.isPopular && (
                <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                  HOT
                </div>
              )}

              {service.discount && (
                <div className="absolute -top-1 -left-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                  {service.discount}
                </div>
              )}

              <span className="text-2xl mb-1">{service.icon}</span>
              <span className="text-xs text-center font-medium leading-tight text-slate-700 dark:text-slate-200">
                {service.name}
              </span>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Service Categories */}
      <div className="mt-6">
        <h3 className="text-base font-semibold text-on-surface mb-3">
          Categories
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 p-4 rounded-xl border border-green-300 dark:border-green-800/30 cursor-pointer hover:shadow-md transition-shadow min-w-[200px] flex-shrink-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <h4 className="font-semibold text-green-900 dark:text-green-300">
                  Utilities
                </h4>
                <p className="text-xs text-green-700 dark:text-green-400">
                  Electricity, Water, Gas
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 p-4 rounded-xl border border-blue-300 dark:border-blue-800/30 cursor-pointer hover:shadow-md transition-shadow min-w-[200px] flex-shrink-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xl">📱</span>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-300">
                  Telecom
                </h4>
                <p className="text-xs text-blue-700 dark:text-blue-400">
                  Mobile, DTH, Broadband
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/10 p-4 rounded-xl border border-purple-300 dark:border-purple-800/30 cursor-pointer hover:shadow-md transition-shadow min-w-[200px] flex-shrink-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-xl">🏦</span>
              </div>
              <div>
                <h4 className="font-semibold text-purple-900 dark:text-purple-300">
                  Banking
                </h4>
                <p className="text-xs text-purple-700 dark:text-purple-400">
                  Credit Card, Loan EMI
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/10 p-4 rounded-xl border border-orange-300 dark:border-orange-800/30 cursor-pointer hover:shadow-md transition-shadow min-w-[200px] flex-shrink-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-xl">🎯</span>
              </div>
              <div>
                <h4 className="font-semibold text-orange-900 dark:text-orange-300">
                  Entertainment
                </h4>
                <p className="text-xs text-orange-700 dark:text-orange-400">
                  OTT, Gaming, Music
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AvailableServices;
