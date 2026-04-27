import httpClient from "@/lib/httpClient";

export async function initiateTopup(payload: { amount: number }) {
  const { data } = await httpClient.post("/wallet/topup-initiate", payload);
  return data;
}

export const fetchTopupStatus = async (topupId: string) => {
  const { data } = await httpClient.get(`/wallet/topup-status/${topupId}`);
  return data;
};

export async function getBalance() {
  const { data } = await httpClient.get("/wallet/balance");
  return data;
}

export async function getTransactions<T>({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const { data } = await httpClient.post("/wallet/trasaction-history", {
    limit,
    page,
  });
  return data as T;
}
