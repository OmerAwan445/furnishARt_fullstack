export const dynamic = "force-dynamic";
import ClientSideSnackbar from "@/components/common/toasts/ClientSideSnackbar";
import Banner from "@/components/HomePage/Banner";
import BestSellers from "@/components/HomePage/BestSellers";
import FurnitureItemsSvs from "@/services/FurnitureItems";
import { Container } from "@mui/material";

export default async function Home() {
  const bestSellerItems = await FurnitureItemsSvs.getBestSellersSS();
  
  return (
    <>
    <ClientSideSnackbar />
    <Container maxWidth="xl" className="px-0 sm:px-auto w-full mt-4 pb-10">
      <Banner />
      {bestSellerItems && <BestSellers items={bestSellerItems} />}
    </Container>
    </>
  );
}
