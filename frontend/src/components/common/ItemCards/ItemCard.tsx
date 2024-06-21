import { ItemCardProps } from "@/types/Types";
import { Rating, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { IoIosStarOutline } from "react-icons/io";
import DefaultButton from "../buttons/DefaultButton";

const ItemCard = ({ item }: { item: ItemCardProps }) => {
  const { id, name, price, rating } = item;
  let image = item.image;

  // COMMENT THIS OUT
    image = name.includes("Chair")
      ? "chair.jpg"
      : name.includes("Table")
      ? "table.jpg"
      : name.includes("Gaming Chair")
      ? "Gaming chair.jpg"
      : name.includes("Sofa")
      ? "sofa.jpg"
      : "chair.jpg";

  return (
    <Card
      sx={{
        // maxWidth: 345,
        width: 345,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          boxShadow: 1,
        },
      }}
    >
      <Link href={`/${id}`} passHref>
        <CardMedia
          component="img"
          sx={{ height: 330 }}
          image={`/items-dummy-images/${image}`}
          alt={name}
        />
      </Link>
      <CardContent>
        <Stack spacing={2} direction={"column"}>
          <Typography
            variant="h5"
            fontWeight={400}
            component="button"
            className="hover:text-gray-500 hover:underline text-left"
          >
            <Link href={`/${id}`} passHref className="inline ">
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
            <DefaultButton
            // variant="contained"
            // color="primary"
            // size="medium"
            >
              Add to cart
            </DefaultButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
