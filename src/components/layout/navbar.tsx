import { Link, NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-blue-600"
        >
          CineSpoilerS
        </Link>

        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost">
            <NavLink to="/">Home</NavLink>
          </Button>

          <Button asChild variant="ghost">
            <NavLink to="/movies">Movies</NavLink>
          </Button>
        </nav>
      </div>
    </header>
  );
}
