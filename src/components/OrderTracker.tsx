import { getServiceOrderStatus } from "@/services/serviceOrder.service";
import { useQuery } from "@tanstack/react-query";

const POLLING_TIMEOUT = 5 * 60 * 1000; // 5 mins

export function OrderTracker({ orderId }: { orderId: string }) {
  const {
    data: order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orderStatus", orderId],
    queryFn: () => getServiceOrderStatus(orderId),

    refetchInterval: (query) => {
      const currentData = query.state.data;
      const firstSuccessTime = query.state.dataUpdatedAt;

      // If no data has arrived yet, don't schedule a poll cycle
      if (!currentData) return false;

      // Stop polling if the server reports a terminal state
      if (currentData.isTerminal) return false;

      // Stop polling if the total elapsed time exceeds the limit
      const elapsedTime = Date.now() - firstSuccessTime;
      if (elapsedTime > POLLING_TIMEOUT) {
        console.warn(
          `Polling stopped: Order ${orderId} timed out after 5 minutes.`,
        );
        return false;
      }

      // Continue polling every 3 seconds if all conditions pass
      return 30000;
    },
    // Optional: Keep polling even if the user switches browser tabs
    refetchIntervalInBackground: true,
  });

  // Calculate if the UI is currently in a timed-out state
  const isTimedOut = !order?.isTerminal && Date.now() - (order ? 1 : 0); // simplistic fallback check for render layer

  if (isLoading) return <div>Loading order details...</div>;
  if (error) return <div>Error fetching order status.</div>;

  return (
    <div>
      <h3>Order ID: {order?.orderId}</h3>
      <p>Status: {order?.status}</p>

      {/* UI Notice for the User */}
      <p>
        {order?.isTerminal && "Successful"}
        {!order?.isTerminal && "Pending"}
      </p>
    </div>
  );
}
