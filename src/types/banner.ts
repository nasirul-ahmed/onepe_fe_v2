export interface BaseBanner {
  id: string;
  component: string;
  version: number;
  priority: number;
  data: {
    props: unknown;
    styles?: Record<string, string>;
    events?: Array<{
      type: string;
      action: string;
      metadata?: Record<string, unknown>;
    }>;
  };
}
