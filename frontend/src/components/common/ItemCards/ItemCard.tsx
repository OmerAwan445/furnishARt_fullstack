import { ItemCardProps } from "@/types/Types";
import { IconButton, Rating, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { IoIosStarOutline } from "react-icons/io";
import AddToCartButton from "../buttons/AddToCartButton";
import { useSession } from "next-auth/react";
import { MdDelete, MdEdit } from "react-icons/md";

const ItemCard = ({
  item,
  contentHeight,
}: {
  item: ItemCardProps;
  contentHeight?: number;
}) => {
  const { data } = useSession();
  const { id, name, price, rating } = item;
  let image = item.image;

  return (
    <Card
      className="!rounded-2xl !overflow-hidden"
      sx={{
        maxWidth: { xs: 335, md: 420 },
        minWidth: { xs: "100%", sm: 300 },
        minHeight: 450,
        maxHeight: 550,
        boxShadow: 8,
        transition: "0.5s",
        transform: "translateY(0)",
        "&:hover": {
          boxShadow: 12,
          transform: "translateY(-10px)",
        },
      }}
    >
      <Link href={`/furniture/${id}`} passHref legacyBehavior>
        <CardMedia
          sx={{
            height: 330,
            filter: "brightness(0.9) contrast(1.2)",
            transition: "filter 0.5s, transform 0.5s",
            "&:hover": {
              filter: "brightness(0.97) contrast(1.4)",
              transform: "scale(1.05)",
            },
          }}
          className="rounded-lg"
          component="img"
          image={image}
          alt={name}
        />
      </Link>
      <CardContent
        className="bg-gradient-to-t from-[#f5f5f5] to-[#e0e6ed]"
        sx={{ height: contentHeight ?? 130, position: "relative" }}
      >
        <Stack spacing={2} direction={"column"} pb={2}>
          <Typography
            variant="h5"
            fontWeight={500}
            sx={{
              color: "background.black",
              "&:hover": { color: "primary.main" },
            }}
            className=" lg:!text-lg hover:underline text-left truncate"
          >
            <Link href={`/furniture/${id}`} passHref className="inline">
              {name}
            </Link>
          </Typography>
          <Rating
            name="text-feedback"
            value={rating ?? 0}
            readOnly
            precision={0.5}
            emptyIcon={<IoIosStarOutline fontSize="inherit" />}
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#f5a623", // Use a light color for stars to contrast with dark background
              },
            }}
          />
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Typography
              className="truncate"
              variant="h6"
              color="text.secondary"
            >
              ${price}
            </Typography>
            <AddToCartButton furnitureId={id} />
          </Stack>
          {data?.user.role == "ADMIN" && (
            <Stack className="absolute bottom-0 left-2" direction="row">
              <Link href={`/products/${id}/edit`} passHref>
                <IconButton aria-label="edit" color="default">
                  <MdEdit className="text-xl" />
                </IconButton>
              </Link>
              <IconButton
                data-item-id={item.id}
                className="delete-item-button"
                aria-label="delete"
                color="default"
              >
                <MdDelete className="text-xl" />
              </IconButton>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
