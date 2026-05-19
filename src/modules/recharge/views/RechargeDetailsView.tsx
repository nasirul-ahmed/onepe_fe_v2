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
import { Contact, useRechargeStore } from "@/store/recharge-store";
import {
  useAddContact,
  useDeleteContact,
  useUserPrefs,
} from "@/hooks/useUserPrefs";
import { cleanPhoneNumber } from "@/lib/utils";
import OfferCard from "@/components/OfferCard";
import { useRouter } from "next/navigation";

interface Props {
  onNext: (data: Partial<Contact>) => void;
}

export const RechargeDetailsView = ({ onNext }: Props) => {
  const [input, setInput] = useState("");
  const [isOptionModalOpen, setOptionModalOpen] = useState(false);
  const router = useRouter();
  const selectedContact = useRechargeStore().selectedContact;
  const setSelectedContact = useRechargeStore().setSelectedContact;

  const { data: user } = useUserProfile();
  const { data: userPrefs } = useUserPrefs();
  const { pickContact, isSupported } = useContactPicker();

  const { mutate: addNewContact } = useAddContact();
  const { mutate: deleteContact } = useDeleteContact();

  const userFullName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : "User";
  const isReady =
    selectedContact?.phone.length === 10 && selectedContact?.operator;

  const userContact: Partial<Contact> = {
    name: userFullName,
    phone: cleanPhoneNumber(user?.phone || ""),
    operator: "JIO",
    circle: "Any Circle",
  };
  const recentNumbers = userPrefs?.savedContacts || [];

  const isNewContact = (phone: string) => {
    return (
      cleanPhoneNumber(user?.phone || "") !== phone &&
      !recentNumbers.find((ct) => ct.phone === phone)
    );
  };

  const handlePickContact = async () => {
    const contact = await pickContact();

    if (!contact) return;

    setSelectedContact({ ...contact, timestamp: Date.now() });

    if (isNewContact(contact.phone)) {
      addNewContact(contact);
    }

    onNext({
      name: contact.name!,
      phone: contact.phone,
      operator: "JIO",
      circle: "Any Circle",
    });
  };

  const handleMobileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _phone = e.target.value.replace(/\D/g, "").slice(0, 10);

    if (_phone.toString().length === 10) {
      const data: Partial<Contact> = {
        phone: _phone,
        operator: "JIO",
        circle: "Any Circle",
      };

      const isUserPhoneNumber = _phone === cleanPhoneNumber(user?.phone || "");

      if (isUserPhoneNumber) {
        setSelectedContact(userContact);
        return;
      }

      setSelectedContact(data);

      if (isNewContact(_phone)) {
        addNewContact(data);
      }

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

    if (phone === cleanPhoneNumber(user?.phone || "")) {
      setSelectedContact({ phone: user?.phone || "", name: userFullName });
    } else {
      const contact = (userPrefs?.savedContacts || []).find(
        (ct) => ct?.phone === phone,
      );
      setSelectedContact(contact as Contact);
    }

    setOptionModalOpen(true);
  };

  const removeFromOnepe = (phone?: string) => {
    if (!phone || !phone.length) return;

    if (phone === user?.phone) {
      setOptionModalOpen(false);
      return;
    }

    deleteContact(phone);
    setOptionModalOpen(false);
  };

  const handleRecentContactClick = (contact: Partial<Contact>) => {
    const data: Partial<Contact> = {
      ...contact,
      operator: "JIO",
      circle: "Any Circle",
    };

    setSelectedContact(data);

    onNext(data);
  };

  React.useEffect(() => {
    router.prefetch("/services/recharge?step=plans");
  }, []);

  return (
    <div className="p-4">
      {/* Offers */}
      <OfferCard totalOffers={23} />
      {/* Input Section */}
      {/* <div className="bg-surface space-y-4"> */}
      <TextField
        label="Mobile Number"
        value={input}
        onChange={handleMobileInputChange}
        startAdornment="+91"
        endAdornment={
          <>
            {isSupported && (
              <button
                onClick={handlePickContact}
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
          phone={cleanPhoneNumber(user?.phone || "")}
          onClick={() => handleRecentContactClick(userContact)}
          onOptionClick={handleOptionClick}
        />
      </div>

      {/* Recent Contacts */}
      {recentNumbers.length > 0 && (
        <div className="w-full mt-4 ">
          {/* <h3 className="text-sm font-semibold mb-3 text-secondary">Recents</h3> */}
          <SectionHeader hideLeadingBar title="Recent Numbers" />
          <div className="flex flex-col gap-4">
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

      {/* <ModalContainer
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
                {`${selectedContact?.name ?? ""}`}
              </span>
              <span className="text-sm text-secondary">
                {`+91${selectedContact?.phone ?? ""}`}
              </span>
            </div>
          </div>
          <Button
            onClick={() => removeFromOnepe(selectedContact?.phone)}
            className="px-6 mt-8 bg-surface-3 flex flex-col justify-center items-center"
          >
            <span>Remove from Onepe</span>
          </Button>
        </div>
      </ModalContainer> */}
    </div>
  );
};
