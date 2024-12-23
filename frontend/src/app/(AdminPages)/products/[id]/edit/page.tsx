import FurnitureItemForm from "@/components/AdminPages/AddProductPage/FurnitureItemForm";
import TitleHeadings from "@/components/common/headings/TitleHeadings";
import FurnitureItemDetails from "@/components/FurniturePage/FurnitureItemDetails";
import TabsSection from "@/components/FurniturePage/TabsSection";
import FurnitureItemsSvs from "@/services/FurnitureItems";
import { FurnitureItemDetailsResponse } from "@/types/Types";
import { filterItemDetailsToFormData } from "@/utils/filterItemDetailsToFormData";
import { Typography } from "@mui/material";

const EditFurniturePage = async ({ params }: { params: { id: string } }) => {
  // fetch furniture item based on id from params
  let item= null;
  const id = parseInt(params.id);
  item = await FurnitureItemsSvs.fetchFurnitureItemFromID(id);
  item = filterItemDetailsToFormData(item);
  return (
    <>
      {item === null ? (
        <Typography mt={4} textAlign={"center"} variant="h3">
          Item not found {id}
        </Typography>
      ) : (
        <>
          <TitleHeadings>Edit Furniture Item</TitleHeadings>
          <FurnitureItemForm type="edit" item={item}/>
          </>
      )}
    </>
  );
};

export default EditFurniturePage;
