"use client";

import React, { useState } from "react";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import { BookUser, ChevronRight, Gift, Phone } from "lucide-react";
import ContactCard from "@/components/ContactCard";
import { useContactPicker } from "@/hooks/useContacts";
import SectionHeader from "@/components/SectionHeader";
import { useUserProfile } from "@/hooks/useAuth";
import ModalContainer from "@/components/ModalContainer";

interface Props {
  onNext: (data: { name?: string; phone: string; operator: string }) => void;
}

interface SavedContact {
  name?: string;
  phone: string;
  timestamp?: number;
}

export const RechargeDetailsView = ({ onNext }: Props) => {
  const [phone, setPhone] = useState("");
  const [operator, setOperator] = useState("Jio Prepaid");
  //TODO: call user preference api here or get data from user pref
  const [recentNumbers, setRecents] = React.useState<SavedContact[]>([
    { name: "Disha", phone: "8133062461", timestamp: Date.now() },
    { phone: "6000839540", name: "XYZ" },
  ]);
  const [optionSelected, setSelectedOption] = useState<SavedContact | null>(
    null,
  );
  const [isOptionModalOpen, setOptionModalOpen] = useState(false);

  const { data: user } = useUserProfile();
  const { pickContact, isSupported } = useContactPicker();
  const isReady = phone.length === 10 && operator;

  const handlePickContact = async () => {
    const contact = await pickContact();
    // console.log({ contact });

    if (!contact) return;
    // setSelectedContact((prev) => [
    //   ...prev,
    //   { ...contact, timestamp: Date.now() },
    // ]);

    // TODO: call api and save the contact in user preferences & directly navigate to select plan
    onNext({ name: contact.name!, phone: contact.phone, operator: "any" });
  };

  const userFullName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : "User";

  const handleMobileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _phone = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(_phone);

    if (_phone.toString().length === 10) {
      const data: SavedContact & { operator: string } = {
        phone: _phone,
        operator: "any",
      };

      if (_phone === user?.phone) data["name"] = userFullName;

      onNext(data);
    }
  };

  const handleOptionClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    phone?: string,
  ) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!phone) return;

    if (phone === user?.phone) {
      setSelectedOption({ phone: user.phone, name: userFullName });
    } else {
      const contact = recentNumbers?.find((ct) => ct?.phone === phone);
      setSelectedOption(contact as SavedContact);
    }

    setOptionModalOpen(true);
  };

  const removeFromOnepe = (phone: string) => {
    if (phone === user?.phone) {
      alert("Cannot delete your own contact");
    }
    setRecents((prev) => prev.filter((ct) => ct.phone !== phone));
    setOptionModalOpen(false);
  };

  return (
    <div className="p-4">
      {/* Offers */}
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

      {/* Input Section */}
      {/* <div className="bg-surface space-y-4"> */}
      <TextField
        label="Mobile Number"
        value={phone}
        onChange={handleMobileInputChange}
        startAdornment="+91"
        endAdornment={
          <>
            {/* {isSupported && ( */}
            <button
              onClick={handlePickContact}
              className="mt-2 rounded-lg"
              aria-label="Pick from contacts"
            >
              <BookUser size={28} className="color-[var(--color-secondary)]" />
            </button>
            {/* )} */}
          </>
        }
      />

      {/*TODO: add a Quick data add-ons section here for different available numbers on user pref + local storage saved contacts */}

      {/* Recent Contacts */}
      <div className="w-full mt-4 space-y-2">
        {/* <h3 className="text-sm font-semibold mb-3 text-secondary">Recents</h3> */}
        <SectionHeader hideLeadingBar title="My Number" />
        <ContactCard
          name={userFullName}
          phone={user?.phone!}
          onClick={() =>
            onNext({ name: userFullName, phone: user?.phone!, operator: "any" })
          }
          onOptionClick={handleOptionClick}
        />
      </div>

      {recentNumbers.length > 0 && (
        <div className="w-full mt-4 ">
          {/* <h3 className="text-sm font-semibold mb-3 text-secondary">Recents</h3> */}
          <SectionHeader hideLeadingBar title="Recent Numbers" />
          <div className="flex flex-col gap-4">
            {recentNumbers.map((ct, index) => (
              <ContactCard
                key={index}
                name={ct.name! || ct.phone}
                phone={ct?.phone!}
                onClick={() =>
                  onNext({ name: ct.name, phone: ct?.phone!, operator: "any" })
                }
                onOptionClick={handleOptionClick}
              />
            ))}
          </div>
        </div>
      )}

      <ModalContainer
        isOpen={isOptionModalOpen}
        onClose={() => setOptionModalOpen(false)}
        title="Contact Optoins"
        variant="bottom-sheet"
        classes="h-[30vh]"
      >
        <div className="flex flex-col mt-4">
          <div className="flex gap-4 items-center">
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <Phone size={20} />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-on-surface">
                {optionSelected?.name!}
              </span>
              <span className="text-sm text-secondary">
                +91 {optionSelected?.phone!}
              </span>
            </div>
          </div>
          <Button
            onClick={() => removeFromOnepe(optionSelected?.phone!)}
            className="px-6 mt-8 bg-[var(--color-secondary)] flex flex-col justify-center items-center"
          >
            <span>Remove from Onepe</span>
          </Button>
        </div>
      </ModalContainer>
    </div>
  );
};
