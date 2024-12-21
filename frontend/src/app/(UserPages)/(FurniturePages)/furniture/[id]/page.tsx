import ClientSideSnackbar from "@/components/common/toasts/ClientSideSnackbar";
import FurnitureItemDetails from "@/components/FurniturePage/FurnitureItemDetails";
import TabsSection from "@/components/FurniturePage/TabsSection";
import FurnitureItemsSvs from "@/services/FurnitureItems";
import { FurnitureItemDetailsResponse } from "@/types/Types";
import { Container, Typography } from "@mui/material";
import React from "react";

const FurniturePage = async ({ params }: { params: { id: string } }) => {
  // fetch furniture item based on id from params
  let item: FurnitureItemDetailsResponse | null = null;
  try { 
  const id = parseInt(params.id);
  item = await FurnitureItemsSvs.fetchFurnitureItemFromID(id);
  } catch (err) {
    console.log(err);
    item = null;
  }
  return <>
    {item === null && <Typography mt={4} textAlign={"center"} variant="h3">Item not found</Typography>}
    <ClientSideSnackbar />
    {item && <>
    <FurnitureItemDetails item={item}/> 
    <TabsSection item= {item} />
    </>
    }
    </>;
};

export default FurniturePage;
