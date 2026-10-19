import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Navigate, useLocation } from "react-router-dom";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export type Role = "worker" | "supervisor" | "admin";

export type User = {
  id: string;
  name: string;
  role: Role;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
};

const Ctx = createContext<AuthContextValue>({
  user: null,
  loading: true,
});

function toPortalUser(authUser: SupabaseUser): User {
  const appRole = authUser.app_metadata?.role;

  const role: Role =
    appRole === "admin" ||
    appRole === "supervisor" ||
    appRole === "worker"
      ? appRole
      : "worker";

  const name =
    authUser.user_metadata?.full_name ||
    authUser.user_metadata?.name ||
    authUser.email ||
    "User";

  return {
    id: authUser.id,
    name,
    role,
  };
}

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? toPortalUser(session.user) : null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Ctx.Provider value={{ user, loading }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  return useContext(Ctx).user;
}

export function useAuthLoading() {
  return useContext(Ctx).loading;
}

export function Protected({
  roles,
  children,
}: {
  roles?: Role[];
  children: ReactNode;
}) {
  const user = useAuth();
  const loading = useAuthLoading();
  const location = useLocation();

  if (loading) {
    return (
      <p className="view-enter" style={{ padding: "2rem" }}>
        Checking your session...
      </p>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  if (roles && !roles.includes(user.role)) {
    return (
      <p className="view-enter" style={{ padding: "2rem" }}>
        You don&apos;t have access to this area. Ask an administrator to change
        your role.
      </p>
    );
  }

  return <>{children}</>;
}