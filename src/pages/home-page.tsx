import { PageContainer } from "@/components/layout/page-container";

export function HomePage() {
  return (
    <PageContainer>
      <section className="py-24">
        <h1 className="text-5xl font-bold tracking-tight">
          CineSpoilerS
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Modern movie ticket platform built with React,
          TypeScript and shadcn/ui.
        </p>
      </section>
    </PageContainer>
  );
}
