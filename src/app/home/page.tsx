import config from "@/config/config.json";
import HomeView from "./HomeView";

export default function HomePage() {
  const services = config.availableServices;

  return <HomeView initialServices={services} />;
}
