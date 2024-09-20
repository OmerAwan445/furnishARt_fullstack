export const fetchCache = 'force-no-store';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { ReactNode } from 'react';
import { Container } from '@mui/material';


type Props = {
    children: ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
        <Container className="max-sm:!px-0" maxWidth="xl" sx={{ py: 4 }} >
            {children}
        </Container>
    );
}

