import { FurnitureItemDetailsResponse } from "@/types/Types";

export const filterItemDetailsToFormData = (item: FurnitureItemDetailsResponse | null) => {
    if(item === null) return null;
    return {
        id: item.id,
        name: item.name,
        description: item.description,
        price: Number(item.price),
        stock_quantity: item.stock_quantity,
        color: item.color,
        dimension: item.dimension,
        weight: Number(item.weight),
        category_id: item.category_id
    }
}