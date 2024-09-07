import { ItemCardProps } from "@/types/Types";
import { Rating, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { IoIosStarOutline } from "react-icons/io";
import DefaultButton from "../buttons/DefaultButton";

const ItemCard = ({ item, contentHeight }: { item: ItemCardProps, contentHeight?: number }) => {
  const { id, name, price, rating } = item;
  let image = item.image;

  return (
    <Card
      className="!rounded-2xl !overflow-hidden"
      sx={{
        maxWidth: {'xs': 335, 'md': 420},
        minWidth: {'xs': 'fit-content', 'sm': 300},
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
      <Link href={`/furniture/${id}`} passHref>
        <CardMedia
          sx={{ 
            height: 330,
            filter: 'brightness(0.9) contrast(1.2)',
            transition: 'filter 0.5s, transform 0.5s',
            "&:hover": {
              filter: 'brightness(0.97) contrast(1.4)',
              transform: "scale(1.05)",
            }
          }}
          className="rounded-lg"
          component="img"
          image={image}
          alt={name}
        />
      </Link>
      <CardContent 
  className="bg-gradient-to-t from-[#f5f5f5] to-[#e0e6ed]" 
  sx={{ height: contentHeight ?? 130, position: 'relative' }}
>
  <Stack spacing={2} direction={"column"} pb={2}>
    <Typography
      variant="h5"
      fontWeight={500}
      sx={{ color: "background.black", '&:hover': {color: 'primary.main'} }}
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
    <Stack direction={"row"} justifyContent={"space-between"} alignItems="center">
      <Typography className="truncate" variant="h6" color="text.secondary">
        ${price}
      </Typography>
      <DefaultButton sx={{
        background: "linear-gradient(90deg, #A69080 0%, #f5a623 100%)", // Warm gradient for button
        color: "#000",
        "&:hover": {
          background: "linear-gradient(90deg, #f5a623 0%, #A69080 100%)",
        },
      }}>
        Add to cart
      </DefaultButton>
    </Stack>
  </Stack>
</CardContent>

    </Card>
  );
};

export default ItemCard;
