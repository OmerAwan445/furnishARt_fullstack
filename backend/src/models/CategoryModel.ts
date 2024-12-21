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
  async deleteCategory(categoryId: number) {
    return await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  }
  async editCategory(categoryId: number, categoryName: string) {
    return await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: categoryName,
      },
    });
  }
}
