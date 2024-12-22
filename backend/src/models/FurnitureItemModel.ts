import { Prisma } from "@prisma/client";
import { FurnitureItemModelFilters } from "@src/Types";
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
          mode: "insensitive",
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

  async getFurnitureItemFromID(id: number) {
    return await prisma.furnitureItem.findUnique({
      where: {
        id,
      },
      include: {
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            customer: {
              select: {
                id: true,
                User: {
                  select: {
                    username: true,
                    first_name: true,
                    last_name: true,
                  },
                },
              },
            },
            // user: {
            //   select: {
            //     id: true,
            //     username: true,
            //     first_name: true,
            //     last_name: true,
            //   },
            // },
          },
          take: 10,
        },
      },
    });
  }

  async getAllFurnitureItems(filters: FurnitureItemModelFilters) {
    const { orderBy, skip, take, whereClause } = filters;
    return await prisma.furnitureItem.findMany({
      take,
      orderBy,
      skip,
      where: whereClause,
      select: {
        id: true,
        name: true,
        price: true,
        image_urls: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });
  }

  async getFurnitureItemPrice(id: number) {
    return await prisma.furnitureItem.findUnique({
      where: {
        id,
      },
      select: {
        price: true,
      },
    });
  }

  async addFurnitureItem(data: Prisma.FurnitureItemCreateInput) {
    return await prisma.furnitureItem.create({
      data,
    });
  }

  async updateFurnitureItem(id: number, data: Prisma.FurnitureItemUpdateInput) {
    return await prisma.furnitureItem.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteFurnitureItem(id: number) {
    return await prisma.furnitureItem.delete({
      where: {
        id,
      },
    });
  }

  async updateStocks(itemId: number, stock_quantity: number) {
    return await prisma.furnitureItem.update({
      where: {
        id: itemId,
      },
      data: {
        stock_quantity,
      },
    });
  }

  async updateFurnitureImageUrls(itemId:number, urls: string[]) {
    return await prisma.furnitureItem.update({
      where: {
        id: itemId,
      },
      data: {
        image_urls: {
          set: urls,
        },
      },
    });
  }
  async updateFurnitureModelUrl(itemId:number, url: string) {
    return await prisma.furnitureItem.update({
      where: {
        id: itemId,
      },
      data: {
        model_3d_url: url,
      },
    });
  }
}
