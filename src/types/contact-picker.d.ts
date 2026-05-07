interface ContactProperty {
  name: string[];
  tel: string[];
  email: string[];
}

interface ContactsManager {
  select(
    properties: ("name" | "tel" | "email")[] | string[],
    options?: { multiple?: boolean },
  ): Promise<ContactProperty[]>;
  getProperties(): Promise<string[]>;
}

interface Navigator {
  contacts?: ContactsManager;
}

interface Window {
  ContactsManager?: unknown;
}
