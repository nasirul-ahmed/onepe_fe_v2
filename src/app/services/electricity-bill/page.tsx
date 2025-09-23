"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Receipt, AlertCircle, CheckCircle, CreditCard } from "lucide-react";
import ContentLayout from "@/components/ContentLayout";
import Button from "@/components/Button";

interface ElectricityProvider {
  id: string;
  name: string;
  logo: string;
  states: string[];
}

const ElectricityBillPage = () => {
  const [selectedProvider, setSelectedProvider] = useState("");
  const [consumerNumber, setConsumerNumber] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [billFetched, setBillFetched] = useState(false);
  const [loading, setLoading] = useState(false);

  const electricityProviders: ElectricityProvider[] = [
    {
      id: "adani",
      name: "Adani Electricity",
      logo: "⚡",
      states: ["Maharashtra", "Gujarat"]
    },
    {
      id: "bescom",
      name: "BESCOM",
      logo: "🔌",
      states: ["Karnataka"]
    },
    {
      id: "bseb",
      name: "BSEB Bihar",
      logo: "💡",
      states: ["Bihar"]
    },
    {
      id: "cesc",
      name: "CESC Kolkata",
      logo: "⚡",
      states: ["West Bengal"]
    },
    {
      id: "dhbvn",
      name: "DHBVN Haryana",
      logo: "🔋",
      states: ["Haryana"]
    },
    {
      id: "jseb",
      name: "JSEB Jharkhand",
      logo: "💡",
      states: ["Jharkhand"]
    },
    {
      id: "mseb",
      name: "MSEB Maharashtra",
      logo: "⚡",
      states: ["Maharashtra"]
    },
    {
      id: "pseb",
      name: "PSEB Punjab",
      logo: "🔌",
      states: ["Punjab"]
    },
    {
      id: "tneb",
      name: "TNEB Tamil Nadu",
      logo: "💡",
      states: ["Tamil Nadu"]
    },
    {
      id: "uppcl",
      name: "UPPCL UP",
      logo: "⚡",
      states: ["Uttar Pradesh"]
    }
  ];

  const handleFetchBill = async () => {
    if (!selectedProvider || !consumerNumber) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBillAmount("1,247");
      setCustomerName("Nasir Khan");
      setDueDate("2024-01-25");
      setBillFetched(true);
      setLoading(false);
    }, 2000);
  };

  const handlePayment = () => {
    // Navigate to payment gateway or handle payment
    alert("Redirecting to payment gateway...");
  };

  return (
    <ContentLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-xl">
            <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Electricity Bill Payment
          </h1>
        </div>

        {!billFetched ? (
          <>
            {/* Provider Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Select Electricity Provider
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {electricityProviders.map((provider) => (
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
                            {provider.states.join(", ")}
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
                      Consumer Number
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
                          Important Information
                        </h4>
                        <ul className="text-sm text-amber-700 dark:text-amber-300 mt-1 space-y-1">
                          <li>• Consumer number can be found on your electricity bill</li>
                          <li>• Make sure to enter the correct consumer number</li>
                          <li>• Bill fetch may take a few seconds</li>
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
                  Bill Fetched Successfully
                </h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center py-2 border-b border-green-200 dark:border-green-700">
                  <span className="text-green-700 dark:text-green-300">Consumer Name:</span>
                  <span className="font-semibold text-green-800 dark:text-green-200">{customerName}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-green-200 dark:border-green-700">
                  <span className="text-green-700 dark:text-green-300">Consumer Number:</span>
                  <span className="font-semibold text-green-800 dark:text-green-200">{consumerNumber}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-green-200 dark:border-green-700">
                  <span className="text-green-700 dark:text-green-300">Bill Amount:</span>
                  <span className="font-bold text-xl text-green-800 dark:text-green-200">₹{billAmount}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-green-700 dark:text-green-300">Due Date:</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">{dueDate}</span>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Payment Details
              </h3>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200">
                      Total Amount to Pay
                    </h4>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      Including convenience fee
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                      ₹{parseInt(billAmount.replace(',', '')) + 5}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      (Bill: ₹{billAmount} + Fee: ₹5)
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={() => setBillFetched(false)}
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
                    <span>Pay Now</span>
                  </div>
                </Button>
              </div>
            </div>

            {/* Safety Notice */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">
                    Safe & Secure Payment
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Your payment is processed through secure payment gateways with 256-bit SSL encryption.
                    You&apos;ll receive instant confirmation and receipt after payment.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </ContentLayout>
  );
};

export default ElectricityBillPage;