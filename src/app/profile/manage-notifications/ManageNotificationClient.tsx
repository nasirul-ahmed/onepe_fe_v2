"use client";

import Switch from "@/components/Switch";
import React from "react";

interface ManageNotificationClientProps {
  payments: {
    push: boolean;
    email: boolean;
  };
  offers: boolean;
}

export default function ManageNotificationClient({
  settings: initialSettings,
}: {
  settings: ManageNotificationClientProps;
}) {
  const [settings, setSettings] = React.useState(initialSettings);

  const handlePaymentToggle = (key: "push" | "email") => {
    const updated = {
      ...settings,
      payments: {
        ...settings.payments,
        [key]: !settings.payments[key],
      },
    };

    setSettings(updated);
  };

  const handleOffersToggle = () => {
    const updated = {
      ...settings,
      offers: !settings.offers,
    };

    setSettings(updated);
  };

  return (
    <div className="h-full max-w-xl mx-auto p-6 flex flex-col gap-4">
      {/* Offers Section */}
      <div className="bg-surface-1 border rounded-xl p-4 classicShadow">
        <h2 className="text-lg font-medium mb-4">🎁 Offers & Rewards</h2>

        <div className="flex items-center justify-between py-2">
          <span>Receive offers & cashback updates</span>
          <div className="h-full">
            <Switch checked={settings.offers} onChange={handleOffersToggle} />
          </div>
        </div>
      </div>

      {/* Payments Section */}
      <div className="bg-surface-1 border rounded-xl p-4 classicShadow">
        <h2 className="text-lg font-medium mb-4">💰 Payment Notifications</h2>

        <div className="flex items-center justify-between py-2">
          <span>Push Notifications</span>
          <div className="h-full">
            <Switch
              checked={settings.payments.push}
              onChange={() => handlePaymentToggle("push")}
            />
          </div>
        </div>
        <div className="divider" />
        <div className="flex items-center justify-between py-2">
          <span>Email Notifications</span>
          <div className="h-full">
            <Switch
              checked={settings.payments.email}
              onChange={() => handlePaymentToggle("email")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
