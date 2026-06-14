import PageTransition from "../components/PageTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <PageTransition skipInitial={false} className="relative w-full">
      {children}
    </PageTransition>
  );
}
