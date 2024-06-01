import { PrismaClient } from "@prisma/client";
import { ratingExtension } from "./utils/prisma/prismaExtensionsCustomMethods";

let prismaInstance: PrismaClient | null = null;

const getPrismaClient = (): PrismaClient => {
  if (!prismaInstance) {
    console.log('Creating Prisma client instance'); // Log the creation of the Prisma client
    prismaInstance = new PrismaClient();
  }
  return prismaInstance;
};

const prisma = getPrismaClient();

let extendedPrisma = prisma.$extends(ratingExtension);

extendedPrisma = extendedPrisma.$extends({
  query: {
    ratings: {
      create: async ({ model, operation, args, query }) => { // eslint-disable-line
        console.log('This is query middleware!');
        const addedRating = await query(args);

        const ratingsAggregation = await prisma.ratings.aggregate({
          where: {
            restaurantId: args.data.restaurantId,
          },
          _avg: {
            rating: true,
          },
        });

        const averageRating = ratingsAggregation._avg.rating?.toFixed(1);

        if (averageRating) {
          // Update avg rating of restaurant
          await prisma.restaurant.update({
            where: {
              id: args.data.restaurantId,
            },
            data: {
              averageRating: Number(averageRating),
            },
          });
        }

        return addedRating;
      },
    },
  },
});

export { extendedPrisma as prisma };
