export interface User {
  id: string;
  email?: string;
  phone?: string;
  role: string;
  isAdmin: boolean;
  authMethod?: string;
  tokenVersion?: number;
  iat?: number;
  exp?: number;
  extraData?: Record<string, any>;
}
