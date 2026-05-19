import httpClient from "@/lib/httpClient";
import { Contact } from "@/store/recharge-store";

interface UserPreference {
  preferredLanguage: string;
  preferredCurrency: string;
  theme: string;
  notificationPreferences: {
    channels: Record<string, boolean>;
    categories: Record<string, boolean>;
  };
  savedContacts: Contact[];
}

export async function getUserPreference(): Promise<UserPreference> {
  const { data } = await httpClient.get<UserPreference>("/user/preference");
  return data;
}

export async function addNewContact(
  contact: Partial<Contact>,
): Promise<UserPreference> {
  const { data } = await httpClient.post<UserPreference>(
    "/user/preference/contacts",
    contact,
  );
  return data;
}

export async function deleteContact(phone: string) {
  const { data } = await httpClient.delete(`user/preference/contacts/${phone}`);
  return data;
}
