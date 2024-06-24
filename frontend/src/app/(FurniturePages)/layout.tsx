import { ReactNode } from 'react';
import OtherAuthPagesFormImage from '@/components/others/OtherAuthPagesFormImage';
import { Container } from '@mui/material';


type Props = {
    children: ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
        <Container maxWidth="xl" sx={{ py: 4 }} >
            {children}
        </Container>
    );
}

