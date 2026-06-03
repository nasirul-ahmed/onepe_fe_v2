import { AppService } from "@/lib/interfaces/services";
import { Typography } from "../Typography";
import { motion } from "framer-motion";
import { ServiceTile } from "../ServicesGrid";
import ROUTES, { RouteUtils } from "@/config/routes";
import { MODAL_TYPES, useAppStore } from "@/store/app-store";
import { useNavigation } from "@/hooks/useNavigate";

export interface ServicesCategory {
  category: string;
  items: AppService[];
}

interface AllServicesModalProps {
  services?: ServicesCategory[];
}

const AllServicesModal = (props: AllServicesModalProps) => {
  const { navigate } = useNavigation();
  const { closeModal, isModalOpen } = useAppStore();

  const services = props?.services || [];

  const handleServiceClick = (slug: string) => {
    isModalOpen(MODAL_TYPES.SHOW_ALL_SERVICES) && closeModal();
    const url = RouteUtils.build(ROUTES.SERVICE_ENTITY, {
      slug: slug,
    });

    navigate(url);
  };
  return (
    <div className="px-5 pb-8">
      {services.map(({ category, items }) => (
        <div key={category} className="mb-6">
          <Typography
            variant={"small"}
            weight={"bold"}
            textColor={"muted"}
            className="font-semibold uppercase tracking-widest mb-3"
          >
            {category}
          </Typography>
          <div className="grid grid-cols-4 gap-[0.3rem]">
            {items.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <ServiceTile
                  service={service}
                  size="sm"
                  onClick={() => handleServiceClick(service.name)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      ))}
      <div className="divider w-full"></div>
      <button
        onClick={() => navigate(ROUTES.SERVICES.path)}
        className="p-2 flex ml-auto mr-auto text-center"
      >
        Go to all services page
      </button>
    </div>
  );
};

export default AllServicesModal;
