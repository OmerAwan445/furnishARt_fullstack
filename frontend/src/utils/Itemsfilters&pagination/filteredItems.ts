import { ReturnFurnitureItems } from "@/types/Types";

export function getFilteredItems(items: ReturnFurnitureItems[]) {
  return items.map((item)=> ({
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image_urls[0],
    rating: item.reviews.reduce((acc, review) => acc + Number(review.rating), 0) / item.reviews.length,
  }));
};

