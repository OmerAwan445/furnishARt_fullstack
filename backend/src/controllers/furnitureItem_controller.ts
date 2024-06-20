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
  public getAutoCompleteFurnitureItems = catchAsyncError(async (req: Request<any, any, any, { q?: string, cid?:  string }>, res) => {
    const { q, cid } = req.query;
    const items = await this.furnitureItemModel.getAutoComplete(q as string, cid);

    return res.send(ApiResponse.success(items, "Auto complete furniture items retrieved successfully"));
  });
}
