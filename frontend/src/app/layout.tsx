import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProviders from "@/components/providers/ReactQueryProviders";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/utils/theme";
import NavbarLayout from "@/components/common/layouts/NavbarLayout";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FurnishARt",
  description: "FurnishARt - The best place to buy furniture online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body className={`${inter.className} bg-white`}>
        <ReactQueryProviders>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <NavbarLayout>{children}</NavbarLayout>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
