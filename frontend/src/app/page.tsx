import Banner from "@/components/HomePage/Banner";
import BestSellers from "@/components/HomePage/BestSellers";
import FurnitureItemsSvs from "@/services/FurnitureItems";
import { Container } from "@mui/material";

export default async function Home() {
  const bestSellerItems = await FurnitureItemsSvs.getBestSellersSS();
  // const  data = await getServerSession(authOptions);
  return (
    <Container maxWidth="xl" className="w-full mt-4 pb-10">
      {/* {JSON.stringify(bestSellerItems)} */}
      <Banner />
      {bestSellerItems && <BestSellers items={bestSellerItems} />}
    </Container>
  );
}
