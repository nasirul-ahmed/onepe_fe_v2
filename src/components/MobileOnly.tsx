// components/MobileOnlyMessage.tsx
const MobileOnlyMessage = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 z-50">
      <div className="text-center max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        {/* Mobile device illustration */}
        <div className="relative mx-auto w-32 h-56 mb-6">
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-3xl border-4 border-gray-300 dark:border-gray-600">
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gray-400 rounded-full"></div>
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          Mobile App Required
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-5">
          For the best experience, please access this application from your
          mobile device. The desktop version is not supported.
        </p>
      </div>
    </div>
  );
};

export default MobileOnlyMessage;
