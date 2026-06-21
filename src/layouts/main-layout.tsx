import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Outlet />
    </main>
  );
}
