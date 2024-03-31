import Sidebar from "@/components/shared/Sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full">
      <Sidebar />
      <main className="p-16 w-full">
        <Toaster />
        {children}
      </main>
    </div>
  );
}
