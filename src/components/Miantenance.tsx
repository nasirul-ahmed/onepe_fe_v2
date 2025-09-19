"use client";

import { Wrench, Clock, Mail } from "lucide-react";

const Maintenance = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        <div className="relative">
          {/* Animated tools */}
          <div className="absolute -top-16 -left-16 w-32 h-32 opacity-10">
            <Wrench size={128} className="text-blue-500 animate-pulse" />
          </div>
          <div className="absolute -bottom-16 -right-16 w-32 h-32 opacity-10">
            <Clock size={128} className="text-blue-500 animate-pulse" />
          </div>
        </div>

        <div className="relative z-10">
          <div className="mb-8">
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Wrench size={48} className="text-blue-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Under Maintenance
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {` We're performing some maintenance to improve your experience.
              We'll be back soon!`}
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-center mb-4">
              <Clock size={20} className="text-blue-500 mr-2" />
              <span className="text-gray-900 dark:text-white font-medium">
                Estimated Time
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">2-3 hours</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-center mb-4">
              <Mail size={20} className="text-blue-500 mr-2" />
              <span className="text-gray-900 dark:text-white font-medium">
                Need immediate assistance?
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Contact our support team
            </p>
            <a
              href="mailto:support@blink.io"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
