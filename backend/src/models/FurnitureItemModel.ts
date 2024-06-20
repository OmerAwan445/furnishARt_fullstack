import { prisma } from "@src/db";

export class FurnitureItemModel {
  async getBestSeller() {
    const bestSeller: any = await prisma.$queryRaw`
      
      SELECT fi.id, fi.name, fi.price
      FROM "FurnitureItem" fi
      INNER JOIN "CartItem" ci ON ci.furniture_item_id = fi.id
      INNER JOIN "Cart" c ON ci.cart_id = c.id
      INNER JOIN "Order" o ON o.cart_id = c.id
      WHERE o.order_status = 'DELIVERED'
      GROUP BY fi.id, fi.name
      ORDER BY SUM(ci.quantity) DESC
      LIMIT 50;
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
