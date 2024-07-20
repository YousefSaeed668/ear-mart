import { MobileSidebar } from "@/components/dashboard-components/MobileSidebar";
import { Sidebar } from "@/components/dashboard-components/Sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid max-md:relative md:grid-cols-[250px,1fr] h-screen">
      <Sidebar />
      <MobileSidebar />
    </div>
  );
}
