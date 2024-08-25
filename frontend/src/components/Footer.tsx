import footerContent from '@/content/footer';
import { Box, Container, Grid, IconButton, Link, Typography } from '@mui/material';
import * as React from 'react';
import { BackgroundBeams } from '@/components/ui/background-beams';

const Footer: React.FC = () => {
  const {title, description, footerColumns, socials } = footerContent;

  return (
    <Box
    className="h-auto w-full bg-gradient-to-l from-neutral-800 via-neutral-900 to-neutral-950 antialiased z-50"
      sx={{
        position: 'relative',
        width: "100vw",
        py: 3,
      }}
    >
      <BackgroundBeams />
      <Container maxWidth={false}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={12} md={3} alignItems={"center"} justifyItems={"center"} sx={{ my: { 'sm': 1, 'md': 0 } }} >
          <h1 className="relative !leading-snug z-10 text-4xl bg-clip-text text-transparent bg-gradient-to-b from-[#aa9784] to-[#4a2b17] text-left font-bold">
        {title}
      </h1>
        {description && <Typography
          className="!tracking-wide !text-sm !mt-1 !leading-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 via-neutral-100 to-neutral-200"
          fontWeight="500"
        >
          {description}
        </Typography>}
          </Grid>
          
          {footerColumns.map((column, index) =>
            <Grid key={column.title} item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" fontWeight={550} color="secondary.light" gutterBottom>
              {column.title}
            </Typography>
            {column.links.map((link, index) =>
              <span key={link.name}>
              <Link underline={"none"}  href={link.link} sx={{ display: 'inline-block', ':hover' : { color: 'secondary.light'}}} color="text.secondary" display="block">{link.name}</Link>
              <br/>
              </span>
            )}
          </Grid>
          )}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" fontWeight={550} color="secondary.light" gutterBottom>
              SOCIAL MEDIA
            </Typography>

           {socials.map(({name, link, SocialIcon}) =>
           <IconButton key={name} aria-label={name} sx={{ color: "background.lightBrown", ':hover' : { color: 'white'}}} component="a" href={link}>
              <SocialIcon />
            </IconButton>
           ) 
            }
          </Grid>
        </Grid>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 4 }}>
          © 2024 FurnishARt. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;