import { CreateRestaurantRating, RegisterRestaurant, UpdateRestaurant } from '@src/controllers/restaurant_controller';
import { validateRequestSchema } from '@src/middlewares/validate-request-schema';
import { RegisterRestaurantSchema, createRatingSchema, createRatingSchemaParams,
  updateRestaurantReqParamsSchema, updateRestaurantSchema } from '@src/validations/RestaurantValidaionSchemas';
import { Router as expressRouters } from 'express';
import { checkSchema } from 'express-validator';

const restaurantRoutes = expressRouters();

restaurantRoutes.route('/')
    .post(checkSchema(RegisterRestaurantSchema, ["body"]), validateRequestSchema, RegisterRestaurant);

restaurantRoutes.put('/:restaurantId', checkSchema(updateRestaurantSchema, ["body"]),
    checkSchema(updateRestaurantReqParamsSchema, ['params']), validateRequestSchema, UpdateRestaurant);

restaurantRoutes.post('/:restaurantId/ratings', checkSchema(createRatingSchema, ['body']),
    checkSchema(createRatingSchemaParams, ['params']), validateRequestSchema,
    CreateRestaurantRating);

export default restaurantRoutes;
