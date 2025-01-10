import { Toaster } from "react-hot-toast";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import PageHeader from "@/components/page-header";
export default function Layout({ children }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-gray-100">
          <Header />
          <main className="p-6">
            <PageHeader />
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
