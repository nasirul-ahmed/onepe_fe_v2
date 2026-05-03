"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tv, Satellite, CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import ContentLayout from "@/components/ContentLayout";
import Button from "@/components/Button";

interface DTHProvider {
  id: string;
  name: string;
  logo: string;
  color: string;
}

interface CustomerInfo {
  name: string;
  balance: string;
  status: string;
  lastRecharge: string;
}

interface DTHPlan {
  id: number;
  name: string;
  amount: number;
  validity: string;
  channels: number;
  description: string;
  category: 'popular' | 'sports' | 'movies' | 'kids';
}

const DTHRechargePage = () => {
  const [selectedProvider, setSelectedProvider] = useState("");
  const [subscriberId, setSubscriberId] = useState("");
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<DTHPlan | null>(null);
  const [activeTab, setActiveTab] = useState<'popular' | 'sports' | 'movies' | 'kids'>('popular');
  const [loading, setLoading] = useState(false);

  const dthProviders: DTHProvider[] = [
    { id: "tataplay", name: "Tata Play", logo: "📺", color: "blue" },
    { id: "airtel", name: "Airtel Digital TV", logo: "📡", color: "red" },
    { id: "dish", name: "Dish TV", logo: "🛰️", color: "orange" },
    { id: "videocon", name: "Videocon D2H", logo: "📺", color: "green" },
    { id: "sun", name: "Sun Direct", logo: "☀️", color: "yellow" },
  ];

  const dthPlans: Record<string, DTHPlan[]> = {
    popular: [
      {
        id: 1,
        name: "Hindi Value Sports",
        amount: 153,
        validity: "30 Days",
        channels: 145,
        description: "Popular Hindi channels + Sports",
        category: "popular"
      },
      {
        id: 2,
        name: "South Titanium HD",
        amount: 315,
        validity: "30 Days", 
        channels: 185,
        description: "Regional + Hindi + HD channels",
        category: "popular"
      },
      {
        id: 3,
        name: "Hindi Basic",
        amount: 99,
        validity: "30 Days",
        channels: 100,
        description: "Essential Hindi entertainment",
        category: "popular"
      }
    ],
    sports: [
      {
        id: 4,
        name: "Sports Lover HD",
        amount: 419,
        validity: "30 Days",
        channels: 195,
        description: "All sports channels in HD",
        category: "sports"
      },
      {
        id: 5,
        name: "Cricket Special",
        amount: 299,
        validity: "30 Days",
        channels: 150,
        description: "Cricket focused sports pack",
        category: "sports"
      }
    ],
    movies: [
      {
        id: 6,
        name: "Movie Buff HD",
        amount: 389,
        validity: "30 Days",
        channels: 180,
        description: "Premium movie channels",
        category: "movies"
      },
      {
        id: 7,
        name: "Hollywood Premium",
        amount: 459,
        validity: "30 Days",
        channels: 200,
        description: "International movie channels",
        category: "movies"
      }
    ],
    kids: [
      {
        id: 8,
        name: "Kids Wonder",
        amount: 179,
        validity: "30 Days",
        channels: 120,
        description: "Educational & entertainment for kids",
        category: "kids"
      },
      {
        id: 9,
        name: "Family Fun",
        amount: 249,
        validity: "30 Days",
        channels: 160,
        description: "Family & kids entertainment",
        category: "kids"
      }
    ]
  };

  const handleFetchInfo = async () => {
    if (!selectedProvider || !subscriberId) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCustomerInfo({
        name: "Nasir Khan",
        balance: "₹45.50",
        status: "Active",
        lastRecharge: "Dec 15, 2023"
      });
      setLoading(false);
    }, 2000);
  };

  const handlePayment = () => {
    if (!selectedPlan) return;
    alert(`Proceeding to pay ₹${selectedPlan.amount} for ${selectedPlan.name}`);
  };

  const getPlanIcon = (category: string) => {
    switch (category) {
      case 'sports': return '⚽';
      case 'movies': return '🎬';
      case 'kids': return '🧸';
      default: return '📺';
    }
  };

  return (
    <ContentLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-xl">
            <Tv className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            DTH Recharge
          </h1>
        </div>

        {/* Provider Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Select DTH Provider
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {dthProviders.map((provider) => (
              <motion.button
                key={provider.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedProvider(provider.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedProvider === provider.id
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-2xl">{provider.logo}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                    {provider.name}
                  </span>
                  {selectedProvider === provider.id && (
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Subscriber ID Input */}
        {selectedProvider && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Enter Subscriber Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subscriber ID / Customer ID
                </label>
                <input
                  type="text"
                  value={subscriberId}
                  onChange={(e) => setSubscriberId(e.target.value)}
                  placeholder="Enter your subscriber ID"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <Button
                onClick={handleFetchInfo}
                disabled={!subscriberId || loading}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Fetching Details...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Satellite className="w-4 h-4" />
                    <span>Fetch Info</span>
                  </div>
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Customer Info & Plans */}
        {customerInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Customer Details */}
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-3 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <h4 className="font-semibold text-green-800 dark:text-green-200">
                  Account Information
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-green-600 dark:text-green-300">Name:</span>
                  <p className="font-medium text-green-800 dark:text-green-200">{customerInfo.name}</p>
                </div>
                <div>
                  <span className="text-green-600 dark:text-green-300">Balance:</span>
                  <p className="font-medium text-green-800 dark:text-green-200">{customerInfo.balance}</p>
                </div>
                <div>
                  <span className="text-green-600 dark:text-green-300">Status:</span>
                  <p className="font-medium text-green-800 dark:text-green-200">{customerInfo.status}</p>
                </div>
                <div>
                  <span className="text-green-600 dark:text-green-300">Last Recharge:</span>
                  <p className="font-medium text-green-800 dark:text-green-200">{customerInfo.lastRecharge}</p>
                </div>
              </div>
            </div>

            {/* Plan Categories */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Choose Recharge Plan
              </h3>
              
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {(['popular', 'sports', 'movies', 'kids'] as const).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-200 ${
                      activeTab === category
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {getPlanIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              {/* Plans Grid */}
              <div className="space-y-3">
                {dthPlans[activeTab].map((plan) => (
                  <motion.div
                    key={plan.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedPlan(plan)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedPlan?.id === plan.id
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{getPlanIcon(plan.category)}</span>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {plan.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {plan.channels} channels • {plan.validity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                          ₹{plan.amount}
                        </p>
                        {selectedPlan?.id === plan.id && (
                          <CheckCircle className="w-5 h-5 text-purple-500 ml-auto" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {plan.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Payment Button */}
            {selectedPlan && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-purple-800 dark:text-purple-200">
                        {selectedPlan.name}
                      </h4>
                      <p className="text-sm text-purple-600 dark:text-purple-300">
                        {selectedPlan.validity} • {selectedPlan.channels} channels
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                        ₹{selectedPlan.amount}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Pay ₹{selectedPlan.amount}</span>
                  </div>
                </Button>
              </motion.div>
            )}

            {/* Information Notice */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800 dark:text-blue-200">
                    Recharge Information
                  </h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                    <li>• Recharge will be processed instantly</li>
                    <li>• SMS confirmation will be sent to your registered mobile</li>
                    <li>• Plan will activate immediately after payment</li>
                    <li>• Contact customer care for any issues</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </ContentLayout>
  );
};

export default DTHRechargePage;