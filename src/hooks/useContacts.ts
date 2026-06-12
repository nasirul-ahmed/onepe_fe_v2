"use client";

import { Capacitor } from "@capacitor/core";
import { Contacts } from "@capacitor-community/contacts";

export interface SelectedContact {
  name: string;
  phone: string;
}

export function useContactPicker() {
  const isNative = Capacitor.isNativePlatform();

  const isSupported =
    isNative ||
    (typeof window !== "undefined" &&
      "contacts" in navigator &&
      "ContactsManager" in window);

  const normalizePhone = (phone: string) => {
    return phone
      .replace(/\s+/g, "")
      .replace(/-/g, "")
      .replace(/^\+91/, "")
      .replace(/^91/, "")
      .replace(/\D/g, "")
      .slice(-10);
  };

  const pickNativeContact = async (): Promise<SelectedContact | null> => {
    try {
      // 1. Check existing permission state first

      console.log("LOG: Checking permissions...");
      let permission = await Contacts.checkPermissions();
      console.log("LOG: Current permission state is:", permission.contacts);

      // 2. If prompt state is undecided, request it explicitly
      if (permission.contacts !== "granted") {
        console.log("LOG: Requesting permissions explicitly...");
        permission = await Contacts.requestPermissions();
      }

      // 3. If access was denied previously, don't attempt to open the picker
      if (permission.contacts === "denied") {
        console.warn("Contact permissions were denied by the user.");
        return null;
      }

      console.log("Proceeding to launch intent...");
      // 4. Fire the native picker cleanly
      const result = await Contacts.pickContact({
        projection: {
          name: true,
          phones: true,
        },
      });

      if (!result?.contact) {
        return null;
      }

      const phone = result.contact.phones?.[0]?.number ?? "";
      const name =
        result.contact.name?.display ?? result.contact.name?.given ?? "";

      return {
        name,
        phone: normalizePhone(phone),
      };
    } catch (error) {
      console.error("Contact picker failed:", error);
      return null;
    }
  };

  const pickWebContact = async (): Promise<SelectedContact | null> => {
    if (!navigator.contacts?.select) {
      return null;
    }
    try {
      const contacts = await navigator.contacts.select(["name", "tel"], {
        multiple: false,
      });

      if (!contacts?.length) {
        return null;
      }

      const contact = contacts[0];

      return {
        name: contact.name?.[0] ?? "",
        phone: normalizePhone(contact.tel?.[0] ?? ""),
      };
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return null;
      }

      throw err;
    }
  };

  const pickContact = async (): Promise<SelectedContact | null> => {
    if (!isSupported) {
      return null;
    }

    return isNative ? pickNativeContact() : pickWebContact();
  };

  return {
    pickContact,
    isSupported,
  };
}
