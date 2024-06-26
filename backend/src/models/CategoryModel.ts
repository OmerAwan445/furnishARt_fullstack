import { prisma } from "@src/db";

export class CategoryModel {
  async getCategories() {
    return await prisma.category.findMany();
  }
}
