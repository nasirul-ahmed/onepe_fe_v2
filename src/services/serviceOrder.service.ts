import httpClient from "@/lib/httpClient";

export interface ServiceOrder {
  orderId: string;
  status: string;
  serviceType: string;
  targetIdentifier: string;
  amount: number;
  providerReferenceId?: string;
  failureReason?: string;
  createdAt: Date;
  completedAt?: Date;
  isTerminal: boolean;
}

export async function getServiceOrderStatus(orderId: string) {
  const { data } = await httpClient.get<ServiceOrder>(
    `/service-orders/${orderId}`,
  );
  return data;
}
