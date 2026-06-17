import type { ReactNode } from "react";

import MobileBottomNav from "@/components/common/MobileButtomNav";
import Navbar from "../components/common/navbar";

type Props = {
  children: ReactNode;
};

const MainLayout = ({
  children,
}: Props) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto p-4">
        {children}
      </main>

      <MobileBottomNav/>
    </div>
  );
};

export default MainLayout;