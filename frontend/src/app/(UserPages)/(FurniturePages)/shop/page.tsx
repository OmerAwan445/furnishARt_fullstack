import FilterComponent from '@/components/ShopPage/FilterComponent';
import ItemsPagination from '@/components/ShopPage/ItemsPagination';
import TitleHeadings from '@/components/common/headings/TitleHeadings';
import ClientSideSnackbar from '@/components/common/toasts/ClientSideSnackbar';
import FurnitureItemsSvs from '@/services/FurnitureItems';
import { Divider } from '@mui/material';

const ShopFurnitureItemPage = async () => {
  const items = await FurnitureItemsSvs.getFurnitureItems();

  return (
    <>
    <ClientSideSnackbar />
      <TitleHeadings textAlign={"center"}>
        Shop
      </TitleHeadings>
      <Divider sx={{ mb: 3 }}  />
      <FilterComponent />
      <ItemsPagination items={items} />
    </>
  )
}

export default ShopFurnitureItemPage
