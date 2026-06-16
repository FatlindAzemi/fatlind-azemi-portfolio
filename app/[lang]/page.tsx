import HomePage from "@/components/HomePage";
import { locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default function Page() {
  return <HomePage />;
}
