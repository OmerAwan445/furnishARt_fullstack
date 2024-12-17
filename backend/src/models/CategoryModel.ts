import { prisma } from "@src/db";

export class CategoryModel {
  async getCategories() {
    return await prisma.category.findMany();
  }
  async addCategory(categoryName: string) {
    return await prisma.category.create({
      data: {
        name: categoryName,
      },
    });
  }
}
