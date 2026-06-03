"use client";

import React, { useState } from "react";
import TextField from "@/components/TextField";
import { BookUser } from "lucide-react";
import { useContactPicker } from "@/hooks/useContacts";
import SectionHeader from "@/components/SectionHeader";
import { useUserProfile } from "@/hooks/useAuth";
import { Contact, useRechargeStore } from "@/store/recharge-store";
import { useAddContact, useUserPrefs } from "@/hooks/useUserPrefs";
import { cleanPhoneNumber } from "@/lib/utils";
import OfferCard from "@/components/OfferCard";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { detectOperatorCircle } from "@/services/mobileRecharge.service";
import { SHEET_TYPES, useAppStore } from "@/store/app-store";
import ContactCard from "../components/ContactCard";

interface Props {
  onNext: (data: Partial<Contact>) => void;
}

export const RechargeDetailsView = ({ onNext }: Props) => {
  const [input, setInput] = useState("");
  const router = useRouter();

  const skipNextDetectionRef = React.useRef(false);

  const openSheet = useAppStore().openSheet;
  const setSelectedContact = useRechargeStore().setSelectedContact;

  const { data: user } = useUserProfile();
  const { data: userPrefs } = useUserPrefs();
  const { mutate: addNewContact } = useAddContact();
  const { pickContact, isSupported } = useContactPicker();

  const debouncedPhone = useDebounce(input, 500);

  const userSelfPhone = cleanPhoneNumber(user?.phone || "");
  const userFullName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : "User";

  const userContact: Partial<Contact> = {
    name: userFullName,
    phone: userSelfPhone,
  };
  const recentNumbers = userPrefs?.savedContacts || [];

  const isNewContact = (phone: string) => {
    return (
      userSelfPhone !== phone && !recentNumbers.find((ct) => ct.phone === phone)
    );
  };

  const processPhoneSelection = React.useCallback(
    async ({ phone, name, operator, circle }: Partial<Contact>) => {
      const normalizedPhone = cleanPhoneNumber(phone || "");

      if (normalizedPhone.length !== 10) return;

      const isSelf = normalizedPhone === userSelfPhone;

      let data: Partial<Contact> = {
        name,
        phone: normalizedPhone,
        operator,
        circle,
      };

      const needsDetection = !data.operator || !data.circle;

      if (needsDetection) {
        try {
          const response = await detectOperatorCircle(normalizedPhone);

          data = {
            ...data,
            ...response,
            operator: response?.operatorId?.replace("_", " "),
            circle: response?.circle,
          };
        } catch {
          data = {
            ...data,
            operator: "Unknown",
            circle: "Unknown",
          };
        }
      }

      setSelectedContact(data);

      // Save/update self contact metadata too
      if (isSelf || isNewContact(normalizedPhone)) {
        addNewContact(data);
      }

      onNext(data);
    },
    [userSelfPhone, setSelectedContact, addNewContact, onNext],
  );

  const handleContactPicker = async () => {
    const contact = await pickContact();

    if (!contact) return;

    skipNextDetectionRef.current = true;
    setInput(contact.phone);

    await processPhoneSelection({
      phone: contact.phone,
      name: contact.name,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value.replace(/\D/g, "").slice(0, 10);

    setInput(phone);
  };

  const handleOptionClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    phone?: string,
  ) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!phone) return;

    let data: Partial<Contact> = { phone };

    if (phone === userSelfPhone) {
      data = { ...data, ...userContact };
    }

    const contact = (userPrefs?.savedContacts || []).find(
      (ct) => ct?.phone === phone,
    );

    data = { ...contact };

    openSheet(SHEET_TYPES.CONTACT_OPTIONS, { ...data });
  };

  const handleRecentContactClick = (contact: Partial<Contact>) => {
    processPhoneSelection({
      phone: contact.phone || "",
      name: contact.name,
      ...contact,
    });
  };

  React.useEffect(() => {
    if (debouncedPhone.length !== 10) return;

    if (skipNextDetectionRef.current) {
      skipNextDetectionRef.current = false;
      return;
    }

    processPhoneSelection({
      phone: debouncedPhone,
    });
  }, [debouncedPhone, processPhoneSelection]);

  React.useEffect(() => {
    router.prefetch("/services/recharge?step=plans");
  }, []);

  return (
    <div className="p-4 pb-48 overflow-y-auto">
      {/* Offers */}
      <div className="mb-2">
        <OfferCard
          totalOffers={23}
          onClick={() => openSheet(SHEET_TYPES.RECHARGE_OFFERS, { offers: [] })}
        />
      </div>
      {/* Input Section */}
      {/* <div className="bg-surface space-y-4"> */}
      <TextField
        label="Mobile Number"
        value={input}
        onChange={handleInputChange}
        startAdornment="+91"
        endAdornment={
          <>
            {isSupported && (
              <button
                onClick={handleContactPicker}
                className="mt-2 rounded-lg"
                aria-label="Pick from contacts"
              >
                <BookUser
                  size={28}
                  className="color-[var(--color-secondary)]"
                />
              </button>
            )}
          </>
        }
      />

      {/*TODO: add a Quick data add-ons section here for different available numbers on user pref + local storage saved contacts */}

      {/* User Contact */}
      <div className="w-full mt-4 space-y-2">
        {/* <h3 className="text-sm font-semibold mb-3 text-secondary">Recents</h3> */}
        <SectionHeader hideLeadingBar title="My Number" />
        <ContactCard
          name={userFullName}
          phone={userSelfPhone}
          onClick={() => handleRecentContactClick(userContact)}
          onOptionClick={handleOptionClick}
        />
      </div>

      {/* Recent Contacts */}
      {recentNumbers.length > 0 && (
        <div className="w-full mt-4 ">
          {/* <h3 className="text-sm font-semibold mb-3 text-secondary">Recents</h3> */}
          <SectionHeader hideLeadingBar title="Recent Numbers" />
          <div className="flex flex-col gap-4 mt-2">
            {recentNumbers.map((ct, index) => (
              <ContactCard
                key={index}
                name={ct.name || ct.phone || "User"}
                phone={ct?.phone ?? ""}
                onClick={() =>
                  handleRecentContactClick({
                    phone: ct?.phone,
                    name: ct?.name ?? "Unkown",
                  } as Contact)
                }
                onOptionClick={handleOptionClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
