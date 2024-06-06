import Link from 'next/link';
import { Typography, Button, Container } from '@mui/material';

export default function Custom404() {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h1" gutterBottom>
        Not Found - 404!
      </Typography>
      <Typography variant="body1" paragraph>
        Oops! Looks like you've stumbled upon a page that doesn't exist.
      </Typography>
      <Typography variant="body1" paragraph>
        Don't worry, you can go back to the home page.
      </Typography>
      <Link href="/" passHref>
        <Button variant="contained" color="secondary">
          Go back to Home
        </Button>
      </Link>
    </Container>
  );
}
