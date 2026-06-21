import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-auto">
      <Separator />

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <p className="text-sm text-muted-foreground">
          © 2026 CineSpoilerS
        </p>

        <p className="text-sm text-muted-foreground">
          Built with React + shadcn/ui
        </p>
      </div>
    </footer>
  );
}
