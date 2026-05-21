import { useRechargeStore } from "@/store/recharge-store";
import { Phone } from "lucide-react";
import Button from "../Button";
import { useUserProfile } from "@/hooks/useAuth";
import { useDeleteContact } from "@/hooks/useUserPrefs";
import { useAppStore } from "@/store/app-store";

interface _ComponentProps {
  data: Record<string, unknown>;
}

export default function ContactDetailsOption(props: _ComponentProps) {
  console.log("ContactDetailsOption props:", props);
  const { data: user } = useUserProfile();
  const { closeSheet } = useAppStore();
  const { mutate: deleteContact } = useDeleteContact();
  const selectedContact = useRechargeStore().selectedContact;

  const removeFromOnepe = (phone?: string) => {
    if (!phone || !phone.length) return;

    if (phone === user?.phone) {
      closeSheet();
      return;
    }

    deleteContact(phone);
    closeSheet();
  };

  return (
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
  );
}
