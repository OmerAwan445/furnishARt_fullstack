import NavbarLayout from "@/components/common/layouts/NavbarLayout";
import AuthSessionProvider from "@/components/providers/AuthSessionProvider";
import ReactQueryProviders from "@/components/providers/ReactQueryProviders";
import StoreProvider from "@/components/providers/StoreProvider";
import { poppins } from "@/utils/fontfamily";
import theme from "@/utils/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import "./globals.css";

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
      <body className={`${poppins.className} bg-[#f7f4f7]`}>
        <ReactQueryProviders>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AuthSessionProvider>
              <StoreProvider>
                  {children}
              </StoreProvider>
              </AuthSessionProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
