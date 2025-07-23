import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/Sidebar";
import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-screen mt-5 w-[100%]">
        <Toaster />
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
