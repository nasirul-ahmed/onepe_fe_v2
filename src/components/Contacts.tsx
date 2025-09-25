"use client";

import { useContacts } from "@/hooks/useContacts";

export default function UserContacts() {
  const { contacts, error, isSupported } = useContacts();

  if (!isSupported) {
    return (
      <div className="p-4 text-yellow-700 bg-yellow-50 rounded">
        ⚠️ Contact Picker API not supported in your browser
      </div>
    );
  }
  return (
    <div className="text-center p-2">
      <div className="text-gray-500">
        Contact picker not available on this device
      </div>

      {error && <div className="text-red-500 mt-2 text-center">{error}</div>}

      {contacts.length > 0 && (
        <div className="mt-4">
          <h3>Selected Contacts:</h3>
          {contacts.map((contact, index) => (
            <div key={index} className="border p-2 mt-2">
              {/* <p>Name: {contact.name?.[0] || "N/A"}</p>
              <p>Email: {contact.email?.[0] || "N/A"}</p>
              <p>Phone: {contact.tel?.[0] || "N/A"}</p> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
