import FurnitureItemForm from "@/components/AdminPages/AddProductPage/FurnitureItemForm";
import TitleHeadings from "@/components/common/headings/TitleHeadings";

const AddFurnitureItemPage = async () => {
  return (
    <>
      <TitleHeadings>Add Furniture Item</TitleHeadings>
      <FurnitureItemForm />
    </>
  );
};

export default AddFurnitureItemPage;
