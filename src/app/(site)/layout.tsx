import { MainHeader } from "@/components/MainHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainHeader />
      {children}
    </>
  );
}
