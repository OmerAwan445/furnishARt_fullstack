import NavbarLayout from "@/components/common/layouts/NavbarLayout";
import SidebarLayout from "@/components/common/layouts/SidebarLayout";
import ClientSideSnackbar from "@/components/common/toasts/ClientSideSnackbar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <SidebarLayout>
      <ClientSideSnackbar />
      {children}
    </SidebarLayout>
  );
}
