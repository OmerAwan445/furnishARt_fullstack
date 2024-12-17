import AuthPageLayout from '@/components/common/layouts/AuthPageLayout';
import ClientSideSnackbar from '@/components/common/toasts/ClientSideSnackbar';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <AuthPageLayout>
      <ClientSideSnackbar />
      {children}
    </AuthPageLayout>
  );
}