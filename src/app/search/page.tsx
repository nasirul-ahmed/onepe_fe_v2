import SearchClient from "./SearchClient";

async function getTrendingData() {
  //TODO: will implement API later
  return [
    { id: 1, query: "Mobile recharge", trend: "+12%" },
    { id: 2, query: "Electricity bill payment", trend: "+8%" },
    { id: 3, query: "DTH recharge", trend: "+15%" },
    { id: 4, query: "Fastag recharge", trend: "+20%" },
  ];
}

export default async function SearchPage() {
  const trendingSearches = await getTrendingData();

  const popularServices = [
    { name: "Mobile Recharge", icon: "📱", color: "blue" },
    { name: "Electricity Bill", icon: "⚡", color: "yellow" },
    { name: "DTH Recharge", icon: "📺", color: "purple" },
    { name: "Gas Booking", icon: "🔥", color: "red" },
  ];

  return (
    <SearchClient
      trendingSearches={trendingSearches}
      popularServices={popularServices}
    />
  );
}
