"use client";

import Card from "./Card";

export interface Service {
  icon: string;
  name: string;
}

interface AvailableServicesProps {
  services: Service[];
}

const AvailableServices = (props: AvailableServicesProps) => {
  const { services } = props;
  return (
    <section className="bg- h-full mt-4 mb-4">
      <h2 className="text-lg font-semibold mb-2">Services</h2>
      <div></div>
      <div className="grid grid-cols-4 gap-4">
        {services.map((service, index) => (
          // <div
          //   key={index}
          //   className="flex flex-col items-center p-2 dark:bg-amber-50 bg-amber-400 rounded-lg shadow-2xl hover:shadow-md transition-shadow cursor-pointer"
          // >
          <Card
            key={index}
            variant="premium"
            color="teal"
            padding="sm"
            className="flex flex-col items-center"
          >
            <span className="text-2xl mb-2">{service.icon}</span>
            <span className="text-sm font-bold text-center">
              {service.name}
            </span>
          </Card>
          // </div>
        ))}
      </div>
    </section>
  );
};

export default AvailableServices;
