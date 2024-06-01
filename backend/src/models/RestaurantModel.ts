import { RemoveUndefined, RestaurantCreateData, RestaurantUpdateData } from "@src/Types";
import { prisma } from "@src/db";

const createRestaurant = async (data: RestaurantCreateData) => {
  return await prisma.restaurant.create({ data });
};

const updateRestaurant = async (id: number, data: RemoveUndefined<RestaurantUpdateData>) => {
  const filteredData = data;
  // remove id from the data
  if ('id' in filteredData) {
    delete filteredData['id'];
  }
  return await prisma.restaurant.update({ where: { id }, data: filteredData });
};

export { createRestaurant, updateRestaurant };
