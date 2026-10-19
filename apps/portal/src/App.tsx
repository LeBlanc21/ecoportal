import { Routes, Route, Navigate } from "react-router-dom"; import { Protected } from "./lib/auth";
import { AppLayout } from "./components/AppLayout"; import { Dashboard } from "./pages/Dashboard"; import { Reports } from "./pages/Reports"; import { Support } from "./pages/Support"; import { Login } from "./pages/Login";
export function App() {
  return <Routes><Route path="/login" element={<Login />} />
    <Route element={<Protected><AppLayout /></Protected>}>
      <Route index element={<Dashboard />} /><Route path="reports" element={<Reports />} /><Route path="support" element={<Support />} /></Route>
    <Route path="*" element={<Navigate to="/" replace />} /></Routes>;
}
