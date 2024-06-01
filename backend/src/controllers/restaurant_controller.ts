import { CreateRatingRequestBody, CreateRatingRequestParam, JwtUser,
  RestaurantCreateData, RestaurantUpdateData } from "@src/Types";
import { createRating } from "@src/models/RatingModel";
import { createRestaurant, updateRestaurant } from "@src/models/RestaurantModel";
import ApiResponse from "@src/utils/ApiResponse";
import { catchAsyncError } from "@src/utils/catchAsyncError";
import { removeUndefinedFromObject } from "@src/utils/common/removeUndefinesFromObjext";
import { Request, Response } from "express";


const RegisterRestaurant = catchAsyncError(async (req: Request<object, object, RestaurantCreateData>,
    res: Response) => {
  const { name, location, priceRange } = req.body;
  const createdRestaurant = await createRestaurant({ name, location, priceRange });
  return res.send(ApiResponse.success(createdRestaurant, "Restaurant created successfully", 201));
});

const UpdateRestaurant = catchAsyncError(async (req: Request<{ restaurantId?: string }, object,
      RestaurantUpdateData>, res: Response) => {
  const { restaurantId } = req.params;
  const updateData = removeUndefinedFromObject(req.body);

  const updatedRestaurant = await updateRestaurant(Number(restaurantId), updateData );
  return res.send(ApiResponse.success(updatedRestaurant, "Restaurant updated successfully", 200));
});


const CreateRestaurantRating = catchAsyncError(async (req: Request<CreateRatingRequestParam, any,
  CreateRatingRequestBody>, res: Response) => {
  const user = req.user as JwtUser;
  const { review, rating } = req.body;
  const { restaurantId } = req.params;
  const userId = user.id;

  await createRating({ review, rating, restaurantId: Number(restaurantId) as number, userId });

  return res.send(ApiResponse.success([], "Rating created successfully", 201));
});

export { CreateRestaurantRating, RegisterRestaurant, UpdateRestaurant };
