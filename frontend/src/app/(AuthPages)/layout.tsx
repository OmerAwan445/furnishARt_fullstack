import AuthPageLayout from '@/components/common/layouts/AuthPageLayout';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <AuthPageLayout>
      {children}
    </AuthPageLayout>
  );
}