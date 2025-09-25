"use client";

import { useState, useCallback, useEffect } from "react";

// Extend Navigator type to include contacts
declare global {
  interface Navigator {
    contacts?: {
      select?: (
        properties?: string[],
        options?: { multiple?: boolean }
      ) => Promise<Contact[]>;
      getProperties?: () => Promise<string[]>;
    };
  }
}

export interface Contact {
  name?: string[];
  email?: string[];
  tel?: string[];
  address?: unknown[];
  icon?: Blob[];
}

interface ContactOptions {
  multiple?: boolean;
}

interface UseContactsReturn {
  contacts: Contact[];
  error: string;
  isLoading: boolean;
  isSupported: boolean;
  supportedProperties: string[];
  getContacts: (
    properties?: string[],
    options?: ContactOptions
  ) => Promise<Contact[]>;
  clearContacts: () => void;
}

export function useContacts(): UseContactsReturn {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [supportedProperties, setSupportedProperties] = useState<string[]>([]);

  // Check if API is supported
  const isSupported = "contacts" in navigator && "ContactsManager" in window;

  // Detect supported properties on mount
  useEffect(() => {
    const checkSupportedProperties = async () => {
      if (
        isSupported &&
        navigator.contacts &&
        "getProperties" in navigator.contacts
      ) {
        try {
          if (typeof navigator.contacts.getProperties === "function") {
            const properties = await navigator.contacts.getProperties();
            setSupportedProperties(properties);
          }
        } catch (err) {
          console.warn("Could not get contact properties:", err);
        }
      }
    };

    checkSupportedProperties();
  }, [isSupported]);

  const getContacts = useCallback(
    async (
      properties: string[] = ["name", "email", "tel"],
      options: ContactOptions = { multiple: true }
    ): Promise<Contact[]> => {
      if (!isSupported) {
        setError("Contact Picker API is not supported in this browser");
        return [];
      }

      setIsLoading(true);
      setError("");

      try {
        // Use only supported properties to avoid TypeError:cite[4]
        const availableProps =
          supportedProperties.length > 0
            ? properties.filter((prop) => supportedProperties.includes(prop))
            : properties;

        if (availableProps.length === 0) {
          setError("No supported contact properties available");
          return [];
        }

        let selectedContacts: Contact[] = [];
        if (
          navigator &&
          navigator.contacts &&
          typeof navigator.contacts.select === "function"
        ) {
          selectedContacts = await navigator.contacts.select(
            availableProps,
            options
          );
        } else {
          setError("Contact Picker API is not available");
          setIsLoading(false);
          return [];
        }
        setContacts(selectedContacts || []);
        return selectedContacts || [];
      } catch (err) {
        const error = err as Error;
        let errorMessage = "Failed to select contacts";

        if (error.name === "AbortError") {
          errorMessage = "Contact selection was cancelled";
        } else if (error.name === "InvalidStateError") {
          errorMessage = "Contact picker is already open";
        } else if (error.name === "SecurityError") {
          errorMessage = "Contact picker must be triggered by user interaction";
        } else if (error.name === "TypeError") {
          errorMessage = "Invalid properties requested";
        }

        setError(errorMessage);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [isSupported, supportedProperties]
  );

  const clearContacts = useCallback(() => {
    setContacts([]);
    setError("");
  }, []);

  return {
    contacts,
    error,
    isLoading,
    isSupported,
    supportedProperties,
    getContacts,
    clearContacts,
  };
}
