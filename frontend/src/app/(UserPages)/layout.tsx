import NavbarLayout from '@/components/common/layouts/NavbarLayout';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <NavbarLayout>
      {children}
    </NavbarLayout>
  );
}