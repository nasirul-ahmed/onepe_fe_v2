"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useNavigation } from "@/hooks/useNavigate";
import { RouteUtils } from "@/config/routes";
import ModalContainer from "./ModalContainer";
import styles from "@/styles/components/servicesGrid.module.css";
import { Service } from "@/lib/interfaces/services";

interface ServicesGridProps {
  services: Service[];
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

interface ServiceTileProps {
  service: Service;
  onClick: () => void;
  size?: "sm" | "md";
}

function ServiceTile({ service, onClick, size = "md" }: ServiceTileProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={onClick}
      className={`${styles.tile} ${size === "sm" ? styles.tileSm : ""}`}
    >
      {service.isPopular && <span className={styles.hotBadge}>HOT</span>}
      {service.discount && (
        <span className={styles.discountBadge}>{service.discount}</span>
      )}
      <span className={styles.tileIcon}>{service.icon}</span>
      <span className={styles.tileName}>{service.name}</span>
    </motion.button>
  );
}

export function ServicesGrid({
  services,
  isModalOpen,
  onOpenModal,
  onCloseModal,
}: ServicesGridProps) {
  const { navigate } = useNavigation();

  const handleServiceClick = (name: string) => {
    onCloseModal();
    const path = RouteUtils.getServiceRoute(name);
    console.log("service path", path, name);
    navigate(path);
  };

  const preview = services.slice(0, 8);

  return (
    <>
      <section className={styles.section}>
        <div className={styles.header}>
          <h2 className={styles.title}>Services</h2>
          <button className={styles.viewAllBtn} onClick={onOpenModal}>
            View All
          </button>
        </div>

        <div className={styles.grid}>
          {preview.map((service, i) => (
            <ServiceTile
              key={i}
              service={service}
              onClick={() => handleServiceClick(service.name)}
            />
          ))}
        </div>
      </section>

      {/* Uses your existing ModalContainer — just with variant="bottom-sheet" */}
      <ModalContainer
        isOpen={isModalOpen}
        onClose={onCloseModal}
        title="All Services"
        variant="bottom-sheet"
      >
        <div className="px-5 pb-8">
          {groupByCategory(services).map(({ category, items }) => (
            <div key={category} className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                {category}
              </p>
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
        </div>
      </ModalContainer>
    </>
  );
}

function groupByCategory(services: Service[]) {
  const map: Record<string, Service[]> = {
    Telecom: [],
    Utilities: [],
    Entertainment: [],
    Banking: [],
    Others: [],
  };

  const rules: [string, string[]][] = [
    ["Telecom", ["mobile", "dth", "broadband", "internet", "recharge"]],
    ["Utilities", ["electricity", "water", "gas", "piped"]],
    ["Entertainment", ["ott", "gaming", "music", "streaming"]],
    ["Banking", ["credit", "loan", "emi", "insurance"]],
  ];

  services.forEach((s) => {
    const lower = s.name.toLowerCase();
    const match = rules.find(([, keywords]) =>
      keywords.some((k) => lower.includes(k)),
    );
    map[match ? match[0] : "Others"].push(s);
  });

  return Object.entries(map)
    .filter(([, items]) => items.length > 0)
    .map(([category, items]) => ({ category, items }));
}
