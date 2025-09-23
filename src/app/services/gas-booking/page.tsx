"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Flame, MapPin, CreditCard, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import ContentLayout from "@/components/ContentLayout";
import Button from "@/components/Button";

interface GasProvider {
  id: string;
  name: string;
  logo: string;
  color: string;
}

interface CustomerInfo {
  name: string;
  address: string;
  mobile: string;
  lastBooking: string;
  connectionType: string;
}

interface Cylinder {
  id: string;
  size: string;
  price: number;
  weight: string;
  type: 'domestic' | 'commercial';
}

const GasBookingPage = () => {
  const [selectedProvider, setSelectedProvider] = useState("");
  const [consumerNumber, setConsumerNumber] = useState("");
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [selectedCylinder, setSelectedCylinder] = useState<Cylinder | null>(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [loading, setLoading] = useState(false);

  const gasProviders: GasProvider[] = [
    { id: "hp", name: "HP Gas", logo: "🔥", color: "red" },
    { id: "bharat", name: "Bharat Gas", logo: "💨", color: "blue" },
    { id: "indane", name: "Indane Gas", logo: "⛽", color: "orange" },
    { id: "reliance", name: "Reliance Gas", logo: "🔥", color: "green" },
  ];

  const cylinders: Cylinder[] = [
    {
      id: "domestic-14.2",
      size: "14.2 kg",
      price: 899,
      weight: "14.2 kg",
      type: "domestic"
    },
    {
      id: "domestic-5",
      size: "5 kg", 
      price: 429,
      weight: "5 kg",
      type: "domestic"
    },
    {
      id: "commercial-19",
      size: "19 kg",
      price: 1699,
      weight: "19 kg", 
      type: "commercial"
    }
  ];

  const deliverySlots = [
    { id: "morning", label: "Morning (9 AM - 12 PM)", time: "09:00-12:00" },
    { id: "afternoon", label: "Afternoon (12 PM - 4 PM)", time: "12:00-16:00" },
    { id: "evening", label: "Evening (4 PM - 7 PM)", time: "16:00-19:00" }
  ];

  const handleFetchInfo = async () => {
    if (!selectedProvider || !consumerNumber) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCustomerInfo({
        name: "Nasir Khan",
        address: "123 Green Park, New Delhi - 110016",
        mobile: "+91 98765 43210", 
        lastBooking: "Nov 15, 2023",
        connectionType: "Domestic"
      });
      setLoading(false);
    }, 2000);
  };

  const handleBooking = () => {
    if (!selectedCylinder || !deliveryDate || !deliveryTime) return;
    alert(`Booking confirmed for ${selectedCylinder.size} cylinder on ${deliveryDate} (${deliveryTime})`);
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7); // 7 days from today
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <ContentLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-xl">
            <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            LPG Gas Booking
          </h1>
        </div>

        {/* Provider Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Select Gas Provider
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {gasProviders.map((provider) => (
              <motion.button
                key={provider.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedProvider(provider.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedProvider === provider.id
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-2xl">{provider.logo}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
                    {provider.name}
                  </span>
                  {selectedProvider === provider.id && (
                    <CheckCircle className="w-4 h-4 text-orange-500" />
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
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-amber-800 dark:text-amber-200">
                      Important Information
                    </h4>
                    <ul className="text-sm text-amber-700 dark:text-amber-300 mt-1 space-y-1">
                      <li>• Consumer number is printed on your gas connection booklet</li>
                      <li>• Booking will be done for registered address only</li>
                      <li>• Delivery charges may apply</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleFetchInfo}
                disabled={!consumerNumber || loading}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Fetching Details...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>Fetch Info</span>
                  </div>
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Customer Info & Booking */}
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
                  Consumer Information
                </h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-600 dark:text-green-300">Name:</span>
                  <span className="font-medium text-green-800 dark:text-green-200">{customerInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600 dark:text-green-300">Mobile:</span>
                  <span className="font-medium text-green-800 dark:text-green-200">{customerInfo.mobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600 dark:text-green-300">Type:</span>
                  <span className="font-medium text-green-800 dark:text-green-200">{customerInfo.connectionType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600 dark:text-green-300">Last Booking:</span>
                  <span className="font-medium text-green-800 dark:text-green-200">{customerInfo.lastBooking}</span>
                </div>
                <div className="pt-2 border-t border-green-200 dark:border-green-700">
                  <span className="text-green-600 dark:text-green-300">Address:</span>
                  <p className="font-medium text-green-800 dark:text-green-200 mt-1">
                    {customerInfo.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Cylinder Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Select Cylinder
              </h3>
              <div className="space-y-3">
                {cylinders
                  .filter(cylinder => 
                    customerInfo.connectionType.toLowerCase() === 'domestic' 
                      ? cylinder.type === 'domestic' 
                      : true
                  )
                  .map((cylinder) => (
                  <motion.div
                    key={cylinder.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedCylinder(cylinder)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedCylinder?.id === cylinder.id
                        ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                          <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {cylinder.size} LPG Cylinder
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {cylinder.type.charAt(0).toUpperCase() + cylinder.type.slice(1)} • {cylinder.weight}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                          ₹{cylinder.price}
                        </span>
                        {selectedCylinder?.id === cylinder.id && (
                          <CheckCircle className="w-5 h-5 text-orange-500" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Delivery Schedule */}
            {selectedCylinder && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Schedule Delivery
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Delivery Date
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      min={getTomorrowDate()}
                      max={getMaxDate()}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Delivery Time Slot
                    </label>
                    <div className="space-y-2">
                      {deliverySlots.map((slot) => (
                        <motion.button
                          key={slot.id}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => setDeliveryTime(slot.time)}
                          className={`w-full p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                            deliveryTime === slot.time
                              ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                              <span className="font-medium text-gray-900 dark:text-white">
                                {slot.label}
                              </span>
                            </div>
                            {deliveryTime === slot.time && (
                              <CheckCircle className="w-4 h-4 text-orange-500" />
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Booking Summary & Payment */}
            {selectedCylinder && deliveryDate && deliveryTime && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-800">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-3">
                    Booking Summary
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-orange-700 dark:text-orange-300">Cylinder:</span>
                      <span className="font-medium text-orange-800 dark:text-orange-200">
                        {selectedCylinder.size} LPG
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-orange-700 dark:text-orange-300">Price:</span>
                      <span className="font-medium text-orange-800 dark:text-orange-200">
                        ₹{selectedCylinder.price}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-orange-700 dark:text-orange-300">Delivery:</span>
                      <span className="font-medium text-orange-800 dark:text-orange-200">
                        {new Date(deliveryDate).toLocaleDateString()} ({deliveryTime})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-orange-700 dark:text-orange-300">Delivery Fee:</span>
                      <span className="font-medium text-orange-800 dark:text-orange-200">₹25</span>
                    </div>
                    <div className="flex justify-between border-t border-orange-200 dark:border-orange-700 pt-2">
                      <span className="font-semibold text-orange-800 dark:text-orange-200">Total:</span>
                      <span className="font-bold text-lg text-orange-800 dark:text-orange-200">
                        ₹{selectedCylinder.price + 25}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleBooking}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Book & Pay ₹{selectedCylinder.price + 25}</span>
                  </div>
                </Button>
              </motion.div>
            )}

            {/* Safety Information */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800 dark:text-blue-200">
                    Safety Guidelines
                  </h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                    <li>• Ensure someone is available at delivery address</li>
                    <li>• Keep old cylinder ready for exchange</li>
                    <li>• Check for leaks before using new cylinder</li>
                    <li>• Delivery executive will verify identity before delivery</li>
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

export default GasBookingPage;