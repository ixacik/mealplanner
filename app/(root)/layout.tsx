import MobileNav from "@/components/shared/MobileNav";
import Sidebar from "@/components/shared/Sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <Sidebar />
      <MobileNav />
      <main className="m-0 lg:ml-64 px-4 md:px-8 lg:px-16 w-full mt-28 mb-16 lg:mt-12">
        <Toaster />
        {children}
      </main>
    </div>
  );
}
