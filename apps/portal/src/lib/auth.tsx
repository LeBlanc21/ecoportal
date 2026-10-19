import { createContext, useContext, type ReactNode } from "react"; import { Navigate, useLocation } from "react-router-dom";
export type Role = "worker" | "supervisor" | "admin";
export type User = { name: string; role: Role };
/** TODO: replace with your real auth (session cookie / OIDC). The server must enforce every permission; this only hides UI. */
const user: User | null = import.meta.env.VITE_DEV_AUTH_BYPASS === "true" ? { name: "Dev User", role: "admin" } : null;
const Ctx = createContext<User | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => <Ctx.Provider value={user}>{children}</Ctx.Provider>;
export const useAuth = () => useContext(Ctx);
export function Protected({ roles, children }: { roles?: Role[]; children: ReactNode }) {
  const u = useAuth(); const loc = useLocation();
  if (!u) return <Navigate to="/login" state={{ from: loc }} replace />;
  if (roles && !roles.includes(u.role)) return <p className="view-enter" style={{ padding: "2rem" }}>You don&apos;t have access to this area. Ask an administrator to change your role.</p>;
  return <>{children}</>;
}
