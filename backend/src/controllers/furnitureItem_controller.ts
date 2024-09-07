import { GetFurnitureItemsFiltersReqQuery } from "@src/Types";
import { AppError } from "@src/errors/AppError";
import { FurnitureItemModel } from "@src/models/FurnitureItemModel";
import ApiResponse from "@src/utils/ApiResponse";
import { catchAsyncError } from "@src/utils/catchAsyncError";
import { getParsedFilters } from "@src/utils/getParsedFilters";
import { Request } from "express";

export class FurnitureItemController {
  private furnitureItemModel: FurnitureItemModel;

  constructor() {
    this.furnitureItemModel = new FurnitureItemModel();
  }

  public getFurnitureItems = catchAsyncError(async (req: Request<any, any, any, GetFurnitureItemsFiltersReqQuery>, res, next) => {
    const { category_id, itemsPerPage, page } = req.query;
    const filters = getParsedFilters({ category_id, itemsPerPage, page });

    const items = await this.furnitureItemModel.getAllFurnitureItems(filters);

    if (!items.length) return next(new AppError("No Item Found", 404));

    return res.send(ApiResponse.success(items, "Furniture items retrieved successfully", 200, items.length));
  });

  public getBestSellerFurnitureItems = catchAsyncError(async (req, res) => {
    const items = await this.furnitureItemModel.getBestSeller();

    return res.send(ApiResponse.success(items, "Best seller furniture items retrieved successfully"));
  });

  // Auto Complete Furniture Items
  public getAutoCompleteFurnitureItems = catchAsyncError(async (req: Request<any, any, any, { q?: string, cid?: string }>, res) => {
    const { q, cid } = req.query;
    const items = await this.furnitureItemModel.getAutoComplete(q as string, cid);

    return res.send(ApiResponse.success(items, "Auto complete furniture items retrieved successfully"));
  });

  public getFurnitureItemFromID = catchAsyncError(async (req: Request<{ id?: string }, any, any>, res, next) => {
    const { id } = req.params;
    if (!id) return next(new AppError("Id is required", 400));

    const item = await this.furnitureItemModel.getFurnitureItemFromID(parseInt(id));
    if (!item) return next(new AppError("Furniture item not found", 404));

    return res.send(ApiResponse.success(item, "Furniture item retrieved successfully"));
  });
}
