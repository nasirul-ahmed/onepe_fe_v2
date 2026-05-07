"use client";

export interface SelectedContact {
  name: string;
  phone: string;
}

export function useContactPicker() {
  // Check if API is available (Android Chrome only)
  const isSupported =
    typeof window !== "undefined" &&
    "contacts" in navigator &&
    "ContactsManager" in window;

  const pickContact = async (): Promise<SelectedContact | null> => {
    if (!isSupported) return null;

    try {
      const properties = ["name", "tel"];
      const options = { multiple: false };

      const contacts = await navigator?.contacts?.select(properties, options);

      if (!contacts || contacts.length === 0) return null;

      const contact = contacts[0];

      const rawPhone = contact.tel?.[0] ?? "";
      const cleaned = rawPhone
        .replace(/\s+/g, "") // remove spaces
        .replace(/-/g, "") // remove dashes
        .replace(/^\+91/, "") // remove India country code
        .replace(/^91/, "") // remove 91 prefix
        .slice(-10); // take last 10 digits

      return {
        name: contact.name?.[0] ?? "",
        phone: cleaned,
      };
    } catch (err) {
      // User cancelled — not an error
      if (err instanceof Error)
        if ((err as Error).name === "AbortError") return null;
      throw err;
    }
  };

  return { pickContact, isSupported };
}
