import { RatingsCreateData } from '@src/Types';
import { prisma } from "@src/db";


const createRating = async (data: RatingsCreateData)=> {
  return await prisma.ratings.createRating(data);
};

export { createRating };
