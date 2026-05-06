import ManageNotificationClient from "./ManageNotificationClient";

export default async function ManageNotifications() {
  return (
    <ManageNotificationClient
      settings={{ payments: { push: true, email: true }, offers: true }}
    />
  );
}
