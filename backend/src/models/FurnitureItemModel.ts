import { prisma } from "@src/db";

export class FurnitureItemModel {
  async getBestSeller() {
    const bestSeller: any = await prisma.$queryRaw`
    SELECT fi.id, fi.name, fi.price, CAST(AVG(r.rating) AS INTEGER) AS rating, fi.image_urls[1] AS image
    FROM "FurnitureItem" fi
    LEFT JOIN "Review" r ON fi.id = r.furniture_id
    GROUP BY fi.id
    ORDER BY fi.total_sales DESC
    LIMIT 15;
  `;

    return bestSeller;
  }

  async getAutoComplete(searchTerm: string, category_id?: string) {
    return await prisma.furnitureItem.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: 'insensitive',
        },
        ...(category_id && { category_id: Number(category_id) }),
      },
      select: {
        id: true,
        name: true,
      },
      take: 10,
    });
  }
}
