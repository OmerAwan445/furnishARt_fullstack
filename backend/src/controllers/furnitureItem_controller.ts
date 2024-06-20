import { FurnitureItemModel } from "@src/models/FurnitureItemModel";
import ApiResponse from "@src/utils/ApiResponse";
import { catchAsyncError } from "@src/utils/catchAsyncError";

export class FurnitureItemController {
  private furnitureItemModel: FurnitureItemModel;

  constructor() {
    this.furnitureItemModel = new FurnitureItemModel();
  }

  public getBestSellerFurnitureItems = catchAsyncError(async (req, res) => {
    // Call the getBestSeller function from the model
    const items = await this.furnitureItemModel.getBestSeller();
    // Send the response with the items
    return res.send(ApiResponse.success(items, "Best seller furniture items retrieved successfully"));
  });
}
