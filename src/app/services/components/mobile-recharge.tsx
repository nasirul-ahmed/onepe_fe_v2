"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Gift,
  CheckCircle,
  BookUser,
  Phone,
  EllipsisVertical,
  ChevronRight,
} from "lucide-react";
import ContentLayout from "@/components/ContentLayout";
import Button from "@/components/Button";
import { useContactPicker } from "@/hooks/useContacts";
import TextField from "@/components/TextField";
import SectionHeader from "@/components/SectionHeader";

interface Plan {
  amount: number;
  validity: string;
  data?: string;
  talktime?: string;
  sms?: string;
  type: "popular" | "talktime" | "data";
}

const MobileRechargePage = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [circle, setCircle] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const operators = [
    { id: "airtel", name: "Airtel", logo: "📶", color: "red" },
    { id: "jio", name: "Jio", logo: "📱", color: "blue" },
    { id: "vi", name: "Vi", logo: "📲", color: "purple" },
    { id: "bsnl", name: "BSNL", logo: "📞", color: "yellow" },
  ];

  const circles = [
    "Delhi",
    "Mumbai",
    "Karnataka",
    "Tamil Nadu",
    "Andhra Pradesh",
    "Kerala",
    "West Bengal",
    "Maharashtra",
    "Gujarat",
    "Rajasthan",
  ];

  const rechargePlans = {
    popular: [
      {
        amount: 199,
        validity: "28 Days",
        data: "1.5GB/Day",
        talktime: "Unlimited",
        sms: "100/Day",
        type: "popular" as const,
      },
      {
        amount: 299,
        validity: "28 Days",
        data: "2GB/Day",
        talktime: "Unlimited",
        sms: "100/Day",
        type: "popular" as const,
      },
      {
        amount: 449,
        validity: "56 Days",
        data: "2GB/Day",
        talktime: "Unlimited",
        sms: "100/Day",
        type: "popular" as const,
      },
      {
        amount: 699,
        validity: "84 Days",
        data: "2GB/Day",
        talktime: "Unlimited",
        sms: "100/Day",
        type: "popular" as const,
      },
    ],
    fullTalktime: [
      {
        amount: 49,
        validity: "28 Days",
        data: "100MB",
        talktime: "₹38.35",
        sms: "20",
        type: "talktime" as const,
      },
      {
        amount: 99,
        validity: "28 Days",
        data: "200MB",
        talktime: "₹76.70",
        sms: "30",
        type: "talktime" as const,
      },
      {
        amount: 179,
        validity: "28 Days",
        data: "1GB",
        talktime: "₹151.20",
        sms: "50",
        type: "talktime" as const,
      },
    ],
    data: [
      {
        amount: 19,
        validity: "1 Day",
        data: "1GB",
        talktime: "-",
        sms: "-",
        type: "data" as const,
      },
      {
        amount: 48,
        validity: "3 Days",
        data: "3GB",
        talktime: "-",
        sms: "-",
        type: "data" as const,
      },
      {
        amount: 98,
        validity: "7 Days",
        data: "12GB",
        talktime: "-",
        sms: "-",
        type: "data" as const,
      },
    ],
  };

  const [activeTab, setActiveTab] =
    useState<keyof typeof rechargePlans>("popular");

  const handleMobileNumberChange = (value: string) => {
    // Only allow numbers and limit to 10 digits
    const cleaned = value.replace(/\D/g, "").slice(0, 10);
    setMobileNumber(cleaned);
  };

  const detectOperator = (number: string) => {
    if (number.length >= 4) {
      // Simple operator detection based on number patterns
      const prefix = number.substring(0, 4);
      if (
        ["7000", "7001", "7002", "8800", "8801"].some((p) =>
          prefix.startsWith(p),
        )
      ) {
        setOperator("jio");
      } else if (
        ["9840", "9841", "9842", "7418", "7419"].some((p) =>
          prefix.startsWith(p),
        )
      ) {
        setOperator("airtel");
      } else {
        setOperator("vi"); // Default
      }
    }
  };

  const handleProceedToRecharge = () => {
    if (selectedPlan) {
      // Here you would integrate with payment gateway
      alert(
        `Proceeding with ₹${selectedPlan.amount} recharge for ${mobileNumber}`,
      );
    }
  };

  const formatCurrency = (amount: number) => `₹${amount}`;

  const getPlanBadge = (plan: Plan) => {
    if (plan.amount === 199 || plan.amount === 299) return "Most Popular";
    if (plan.amount === 449) return "Best Value";
    return null;
  };
  const [selectedContact, setSelectedContact] = React.useState<
    {
      name: string;
      phone: string;
      timestamp: number;
    }[]
  >([{ name: "Disha", phone: "8133062461", timestamp: Date.now() }]);
  const { pickContact, isSupported } = useContactPicker();

  const handlePickContact = async () => {
    const contact = await pickContact();
    // console.log({ contact });

    if (!contact) return;
    setSelectedContact((prev) => [
      ...prev,
      { ...contact, timestamp: Date.now() },
    ]);
  };

  return (
    <ContentLayout>
      <div className="space-y-2">
        {/* Offers Banner */}
        <Button className="w-full bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-800/30">
          <div className="w-full p-2">
            <div className="flex justify-between items-center gap-3">
              <div className="flex gap-4">
                <Gift className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                <span className="font-semibold text-lg text-orange-800 dark:text-orange-300">
                  {"23"} Offers available
                </span>
              </div>
              <ChevronRight />
            </div>
          </div>
        </Button>

        {/* Mobile Number Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface rounded-xl py-2 shadow-sm"
        >
          <div className="space-y-4">
            <div className="">
              <TextField
                label="Enter Mobile Number"
                name="mobileNumber"
                value={mobileNumber}
                maxLength={10}
                onChange={(e) => {
                  handleMobileNumberChange(e.target.value);
                  detectOperator(e.target.value);
                }}
                startAdornment={"+91"}
                endAdornment={
                  <>
                    {isSupported && (
                      <button
                        onClick={handlePickContact}
                        className="mt-2 rounded-lg"
                        aria-label="Pick from contacts"
                      >
                        <BookUser size={28} />
                      </button>
                    )}
                  </>
                }
                className="bg-transparent"
              />
              {mobileNumber.length === 10 && (
                <div className="flex items-center gap-2 mt-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Valid mobile number</span>
                </div>
              )}
            </div>

            {/* Operator Selection */}
            {mobileNumber.length >= 4 && (
              <div>
                <label className="text-sm font-medium text-secondary mb-2 block">
                  Select Operator
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {operators.map((op) => (
                    <motion.button
                      key={op.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setOperator(op.id)}
                      className={`p-3 rounded-lg border text-center transition-all ${
                        operator === op.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="text-lg mb-1">{op.logo}</div>
                      <div className="text-xs font-medium">{op.name}</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Circle Selection */}
            {operator && (
              <div>
                <label className="text-sm font-medium text-secondary mb-2 block">
                  Select Circle
                </label>
                <select
                  value={circle}
                  onChange={(e) => setCircle(e.target.value)}
                  className="w-full p-3 border border-border rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-on-surface"
                >
                  <option value="">Choose your circle</option>
                  {circles.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </motion.div>

        <div className="w-full space-y-2">
          <SectionHeader hideLeadingBar title="My Number" />
          <div className="classicShadow rounded-xl p-2">
            <div className="bg-red p-2 flex justify-between items-center">
              <div className="flex gap-8 items-center">
                <Phone />
                <div className="flex flex-col">
                  <span>{"Nasirul Ahmed"}</span>
                  <span>{"9101336849"}</span>
                </div>
              </div>
              <EllipsisVertical />
            </div>
          </div>
        </div>

        <div className="w-full">
          <SectionHeader hideLeadingBar title="My Recharges & Bills" />
          {selectedContact?.map((contact) => {
            return (
              <div className="classicShadow rounded-xl p-2">
                <div className="bg-red p-2 flex justify-between items-center">
                  <div className="flex gap-8 items-center">
                    <Phone />
                    <div className="flex flex-col">
                      <span>{"Nasirul Ahmed"}</span>
                      <span>{"9101336849"}</span>
                    </div>
                  </div>
                  <EllipsisVertical />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recharge Plans */}
        {mobileNumber.length === 10 && operator && circle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surface rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-on-surface mb-3">
                Choose Recharge Plan
              </h3>

              {/* Plan Tabs */}
              <div className="flex gap-2 mb-4">
                {Object.keys(rechargePlans).map((tab) => (
                  <motion.button
                    key={tab}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setActiveTab(tab as keyof typeof rechargePlans)
                    }
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab
                        ? "bg-primary text-white"
                        : "bg-muted text-secondary hover:text-on-surface"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() +
                      tab.slice(1).replace(/([A-Z])/g, " $1")}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Plans List */}
            <div className="max-h-80 overflow-y-auto">
              <div className="space-y-2 p-4">
                {rechargePlans[activeTab].map((plan, index) => {
                  const badge = getPlanBadge(plan);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedPlan(plan)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all relative ${
                        selectedPlan?.amount === plan.amount
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      {badge && (
                        <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                          {badge}
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-on-surface">
                            {formatCurrency(plan.amount)}
                          </span>
                          {selectedPlan?.amount === plan.amount && (
                            <CheckCircle className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-secondary">
                          {plan.validity}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-secondary">Data: </span>
                          <span className="font-medium text-on-surface">
                            {plan.data}
                          </span>
                        </div>
                        <div>
                          <span className="text-secondary">Talk: </span>
                          <span className="font-medium text-on-surface">
                            {plan.talktime}
                          </span>
                        </div>
                        {plan.sms !== "-" && (
                          <div className="col-span-2">
                            <span className="text-secondary">SMS: </span>
                            <span className="font-medium text-on-surface">
                              {plan.sms}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Proceed Button */}
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky bottom-20 z-10"
          >
            <Button
              onClick={handleProceedToRecharge}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 rounded-xl shadow-lg"
            >
              <Zap className="w-5 h-5 mr-2" />
              Recharge {formatCurrency(selectedPlan.amount)}
            </Button>
          </motion.div>
        )}
      </div>
    </ContentLayout>
  );
};

export default MobileRechargePage;
