import { COMPONENT_REGISTRY } from "./registry";
import { BaseBanner } from "./types";

export default function DynamicBanner({ banner }: { banner: BaseBanner }) {
  const key: string = `${banner.component}_v${banner.version}`;
  const entry = COMPONENT_REGISTRY[key];

  if (!entry) {
    console.error("Unknown component:", banner.component);
    return null;
  }

  const { component: Component, schema } = entry;

  const parsed = schema.safeParse(banner.data.props);

  if (!parsed.success) {
    console.error("Invalid props for", banner.component, parsed.error);
    return null;
  }

  return (
    <div className="">
      <Component {...(parsed.data as Record<string, unknown>)} />
    </div>
  );
}
