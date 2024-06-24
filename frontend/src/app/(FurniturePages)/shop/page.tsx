import FilterComponent from '@/components/ShopPage/FilterComponent'
import ItemsPagination from '@/components/ShopPage/ItemsPagination'
import TitleHeadings from '@/components/common/headings/TitleHeadings';
import FurnitureItemsSvs from '@/services/FurnitureItems'
import { getFilteredItems } from '@/utils/Itemsfilters&pagination/filteredItems';
import { Divider } from '@mui/material';

const ShopFurnitureItemPage = async () => {
  const items = await FurnitureItemsSvs.getFurnitureItems();

  return (
    <>
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
