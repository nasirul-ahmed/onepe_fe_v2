import { Suspense } from "react";
import { COMPONENT_REGISTRY } from "./registry";
import { BaseBanner } from "./types";
import OnepeLiquidLoader from "../OnePeLoader";

export default function DynamicBanner({ banner }: { banner: BaseBanner }) {
  const key: string = `${banner.component}_v${banner.version}`;
  const entry = COMPONENT_REGISTRY[key as keyof typeof COMPONENT_REGISTRY];

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props: any = parsed.data;
  return (
    <div className="">
      <Suspense fallback={<OnepeLiquidLoader />}>
        <Component {...props} />
      </Suspense>
    </div>
  );
}
