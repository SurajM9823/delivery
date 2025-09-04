import { ReactNode } from "react";
import VendorSidebar, { VendorBottomNav } from "./VendorNav";
import { VendorHeader } from "./VendorHeader";

interface VendorLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function VendorLayout({ children, title, subtitle }: VendorLayoutProps) {
  return (
    <VendorSidebar>
      <div className="flex flex-col min-h-screen">
        <VendorHeader title={title} subtitle={subtitle} />
        <main className="flex-1 pb-20">
          {children}
        </main>
        <VendorBottomNav />
      </div>
    </VendorSidebar>
  );
}

// Wrapper component for individual vendor pages
interface VendorPageProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function VendorPage({ children, title, subtitle }: VendorPageProps) {
  return (
    <VendorLayout title={title} subtitle={subtitle}>
      {children}
    </VendorLayout>
  );
}