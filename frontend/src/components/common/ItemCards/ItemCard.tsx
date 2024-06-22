import { ItemCardProps } from "@/types/Types";
import { Rating, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { IoIosStarOutline } from "react-icons/io";
import DefaultButton from "../buttons/DefaultButton";

const ItemCard = ({ item }: { item: ItemCardProps }) => {
  const { id, name, price, rating } = item;
  let image = item.image;

  // Uncomment or adjust the image fallback logic if necessary
  // image = name.includes("Chair")
  //   ? "chair.jpg"
  //   : name.includes("Table")
  //   ? "table.jpg"
  //   : name.includes("Gaming Chair")
  //   ? "Gaming chair.jpg"
  //   : name.includes("Sofa")
  //   ? "sofa.jpg"
  //   : "chair.jpg";

  return (
    <Card
    className="!rounded-t-2xl !overflow-hidden"
      sx={{
        boxShadow: 4,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 1,
        },
      }}
    >
      <Link href={`/furniture/${id}`} passHref>
        <CardMedia
        sx={{ 
          height: 330,
          filter: 'brightness(0.95)',
          transition: 'filter 0.3s',
          "&:hover": {
            filter: 'brightness(1)',
          }
        }}
        className="rounded-lg"
          component="img"
          image={image}
          alt={name}
        />
      </Link>
      <CardContent className="bg-lightBg" sx={{ height: 150 }}>
        <Stack spacing={2} direction={"column"} >
          <Typography
            variant="h5"
            fontWeight={400}
            className="hover:text-gray-500 hover:underline text-left truncate"
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
          />
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography className="truncate" variant="h6" color="text.primary">
              ${price}
            </Typography>
            <DefaultButton>
              Add to cart
            </DefaultButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
