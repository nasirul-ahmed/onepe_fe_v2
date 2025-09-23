"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Receipt, CreditCard, CheckCircle, AlertCircle, MapPin } from "lucide-react";
import ContentLayout from "@/components/ContentLayout";
import Button from "@/components/Button";

interface WaterProvider {
  id: string;
  name: string;
  logo: string;
  areas: string[];
}

interface BillInfo {
  consumerName: string;
  billNumber: string;
  billAmount: number;
  dueDate: string;
  billPeriod: string;
  address: string;
}

const WaterBillPage = () => {
  const [selectedProvider, setSelectedProvider] = useState("");
  const [consumerNumber, setConsumerNumber] = useState("");
  const [billInfo, setBillInfo] = useState<BillInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const waterProviders: WaterProvider[] = [
    {
      id: "dda",
      name: "DDA Water Board",
      logo: "💧",
      areas: ["Central Delhi", "South Delhi", "East Delhi"]
    },
    {
      id: "mcd",
      name: "MCD Water Supply",
      logo: "🚰",
      areas: ["North Delhi", "West Delhi", "Shahdara"]
    },
    {
      id: "bwssb",
      name: "BWSSB Bangalore",
      logo: "💦",
      areas: ["Bangalore Urban", "Bangalore Rural"]
    },
    {
      id: "mumbai",
      name: "Mumbai Water Dept",
      logo: "🌊",
      areas: ["Mumbai City", "Mumbai Suburban"]
    },
    {
      id: "hyderabad",
      name: "HMWSSB Hyderabad",
      logo: "💧",
      areas: ["Hyderabad", "Secunderabad", "Cyberabad"]
    },
    {
      id: "chennai",
      name: "Chennai Metro Water",
      logo: "🚰",
      areas: ["Chennai City", "Chennai Suburban"]
    }
  ];

  const handleFetchBill = async () => {
    if (!selectedProvider || !consumerNumber) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBillInfo({
        consumerName: "Nasir Khan",
        billNumber: "WB240125001",
        billAmount: 1850,
        dueDate: "2024-01-30",
        billPeriod: "Dec 2023 - Jan 2024",
        address: "123 Green Park, New Delhi - 110016"
      });
      setLoading(false);
    }, 2000);
  };

  const handlePayment = () => {
    if (!billInfo) return;
    alert(`Processing payment of ₹${billInfo.billAmount} for water bill`);
  };

  const getConvenienceFee = (amount: number) => {
    return Math.max(5, Math.min(20, Math.round(amount * 0.01))); // 1% with min 5, max 20
  };

  return (
    <ContentLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-xl">
            <Droplets className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Water Bill Payment
          </h1>
        </div>

        {!billInfo ? (
          <>
            {/* Provider Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Select Water Board
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {waterProviders.map((provider) => (
                  <motion.button
                    key={provider.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedProvider(provider.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedProvider === provider.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{provider.logo}</span>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {provider.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {provider.areas.join(", ")}
                          </p>
                        </div>
                      </div>
                      {selectedProvider === provider.id && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Consumer Number Input */}
            {selectedProvider && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Enter Consumer Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Consumer Number / Account Number
                    </label>
                    <input
                      type="text"
                      value={consumerNumber}
                      onChange={(e) => setConsumerNumber(e.target.value)}
                      placeholder="Enter your consumer number"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-amber-800 dark:text-amber-200">
                          How to find Consumer Number
                        </h4>
                        <ul className="text-sm text-amber-700 dark:text-amber-300 mt-1 space-y-1">
                          <li>• Check your previous water bill for consumer number</li>
                          <li>• Consumer number is usually 8-12 digits long</li>
                          <li>• Some boards use account numbers instead</li>
                          <li>• Contact water board office if unsure</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleFetchBill}
                    disabled={!consumerNumber || loading}
                    className="w-full"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Fetching Bill...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Receipt className="w-4 h-4" />
                        <span>Fetch Bill</span>
                      </div>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </>
        ) : (
          /* Bill Details & Payment */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Bill Summary */}
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                  Bill Details Retrieved
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center py-2 border-b border-green-200 dark:border-green-700">
                    <span className="text-green-700 dark:text-green-300">Consumer Name:</span>
                    <span className="font-semibold text-green-800 dark:text-green-200">{billInfo.consumerName}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-green-200 dark:border-green-700">
                    <span className="text-green-700 dark:text-green-300">Bill Number:</span>
                    <span className="font-semibold text-green-800 dark:text-green-200">{billInfo.billNumber}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-green-200 dark:border-green-700">
                    <span className="text-green-700 dark:text-green-300">Bill Period:</span>
                    <span className="font-semibold text-green-800 dark:text-green-200">{billInfo.billPeriod}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-green-200 dark:border-green-700">
                    <span className="text-green-700 dark:text-green-300">Due Date:</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">{billInfo.dueDate}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-green-700 dark:text-green-300">Bill Amount:</span>
                    <span className="font-bold text-2xl text-green-800 dark:text-green-200">₹{billInfo.billAmount}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-green-200 dark:border-green-700">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <span className="text-green-700 dark:text-green-300 text-sm">Address:</span>
                      <p className="font-medium text-green-800 dark:text-green-200 text-sm mt-1">
                        {billInfo.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Payment Summary
              </h3>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700 dark:text-blue-300">Bill Amount:</span>
                    <span className="font-semibold text-blue-800 dark:text-blue-200">₹{billInfo.billAmount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700 dark:text-blue-300">Convenience Fee:</span>
                    <span className="font-semibold text-blue-800 dark:text-blue-200">₹{getConvenienceFee(billInfo.billAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-blue-200 dark:border-blue-700">
                    <span className="font-bold text-blue-800 dark:text-blue-200">Total Amount:</span>
                    <span className="font-bold text-xl text-blue-800 dark:text-blue-200">
                      ₹{billInfo.billAmount + getConvenienceFee(billInfo.billAmount)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={() => setBillInfo(null)}
                  variant="outline"
                  className="flex-1"
                >
                  Fetch Another Bill
                </Button>
                <Button
                  onClick={handlePayment}
                  className="flex-1"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Pay ₹{billInfo.billAmount + getConvenienceFee(billInfo.billAmount)}</span>
                  </div>
                </Button>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">
                    Payment Guidelines
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                    <li>• Payment will be processed instantly after confirmation</li>
                    <li>• You will receive SMS and email confirmation</li>
                    <li>• Keep the transaction receipt for your records</li>
                    <li>• Allow 24-48 hours for payment reflection in water board system</li>
                    <li>• Contact customer support for any payment related queries</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Late Fee Warning */}
            {new Date(billInfo.dueDate) < new Date() && (
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-red-800 dark:text-red-200">
                      ⚠️ Overdue Payment Notice
                    </h4>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                      This bill was due on {billInfo.dueDate}. Late payment charges may apply. 
                      Please pay immediately to avoid service disconnection.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </ContentLayout>
  );
};

export default WaterBillPage;