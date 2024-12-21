import TitleHeadings from "@/components/common/headings/TitleHeadings";
import FilterComponent from "@/components/ShopPage/FilterComponent";
import ItemsPagination from "@/components/ShopPage/ItemsPagination";
import FurnitureItemsSvs from "@/services/FurnitureItems";
import { Divider } from "@mui/material";

async function ProductsPage() {
  const items = await FurnitureItemsSvs.getFurnitureItems();
  return (
    <>
      <TitleHeadings textAlign={"center"}>
        All Furniture Items
      </TitleHeadings>
      <Divider sx={{ mb: 3 }}  />
      <FilterComponent />
      <ItemsPagination items={items} />
    </>
  );
}

export default ProductsPage;
