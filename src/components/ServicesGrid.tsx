"use client";

import { useNavigation } from "@/hooks/useNavigate";
import ROUTES, { RouteUtils } from "@/config/routes";
import styles from "@/styles/components/servicesGrid.module.css";
import { cn } from "@/lib/utils";
import { AppService } from "@/lib/interfaces/services";
import React from "react";
import config from "@/config/config.json";
import Button from "./Button";

interface ServicesGridProps {
  services: AppService[];
  isModalOpen?: boolean;
  onOpenModal?: () => void;
  onCloseModal?: () => void;
}

interface ServiceTileProps {
  service: AppService;
  onClick: () => void;
  size?: "xs" | "sm" | "md";
  classes?: string;
}

export function ServiceTile({
  service,
  onClick,
  size = "sm",
  classes,
}: ServiceTileProps) {
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    if (loading) return;
    setLoading(true);
    onClick?.();
  };

  return (
    <Button
      onClick={handleClick}
      className={cn(
        styles.tile,
        size === "sm" && styles.tileSm,
        size === "xs" && styles.tileXs,
        classes,
      )}
    >
      {service.isPopular && <span className={styles.hotBadge}>HOT</span>}
      {service.discountPercentage! > 0 && (
        <span className={styles.discountBadge}>
          {service.discountPercentage}%
        </span>
      )}
      <span className={styles.tileIcon}>{service.icon}</span>
      <span className={styles.tileName}>{service.name}</span>
    </Button>
  );
}

export default function ServicesGrid({
  services: intialServices,
  isModalOpen,
  onOpenModal,
  onCloseModal,
}: ServicesGridProps) {
  const { navigate } = useNavigation();

  const handleServiceClick = (slug: string) => {
    isModalOpen && onCloseModal!();
    const url = RouteUtils.build(ROUTES.SERVICE_ENTITY, {
      slug: slug,
    });

    navigate(url);
  };

  const services =
    intialServices.length > 0
      ? intialServices
      : (config.appServices satisfies AppService[]);
  const preview = services.slice(0, 8);

  return (
    <>
      <section className={styles.section}>
        <div
          className={cn(
            styles.grid,
            "p-4 rounded-lg bg-[var(--color-surface-2)] ",
          )}
        >
          {preview.map((service, i) => (
            <ServiceTile
              key={i}
              service={service}
              onClick={() => handleServiceClick(service.slug)}
            />
          ))}
        </div>
      </section>

      {/* Uses your existing ModalContainer — just with variant="bottom-sheet" */}
      {/* {modalEnabled && (
        <ModalContainer
          isOpen={isModalOpen!}
          onClose={onCloseModal!}
          title="All Services"
          variant="bottom-sheet"
        >
          <div className="px-5 pb-8">
            {groupByCategory(services).map(({ category, items }) => (
              <div key={category} className="mb-6">
                <Typography
                  variant={"small"}
                  weight={"bold"}
                  textColor={"muted"}
                  className="font-semibold uppercase tracking-widest mb-3"
                >
                  {category}
                </Typography>
                <div className={styles.modalGrid}>
                  {items.map((service, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
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
        </ModalContainer>
      )} */}
    </>
  );
}

function groupByCategory(services: AppService[]) {
  const groupedByCategory = services.reduce(
    (acc, service) => {
      const key = service.category;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(service);
      return acc;
    },
    {} as { [key: string]: AppService[] },
  );
  return Object.entries(groupedByCategory).map(([category, items]) => ({
    category,
    items,
  }));
}
