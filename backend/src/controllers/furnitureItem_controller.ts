import { FurnitureItemModel } from "@src/models/FurnitureItemModel";
import ApiResponse from "@src/utils/ApiResponse";
import { catchAsyncError } from "@src/utils/catchAsyncError";
import { Request } from "express";

export class FurnitureItemController {
  private furnitureItemModel: FurnitureItemModel;

  constructor() {
    this.furnitureItemModel = new FurnitureItemModel();
  }

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
  public getFurnitureItemFromID = catchAsyncError(async (req: Request<{ id?: string }, any, any>, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).send(ApiResponse.error("Id is required", 400));

    const item = await this.furnitureItemModel.getFurnitureItemFromID(parseInt(id));
    if (!item) return res.status(404).send(ApiResponse.error("Furniture item not found", 404));

    return res.send(ApiResponse.success(item, "Furniture item retrieved successfully"));
  });
}
