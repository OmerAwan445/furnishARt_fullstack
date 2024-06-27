import { CategoryModel } from "@src/models/CategoryModel";
import ApiResponse from "@src/utils/ApiResponse";
import { catchAsyncError } from "@src/utils/catchAsyncError";

export class CategoryController {
  private categoryModel: CategoryModel;

  constructor() {
    this.categoryModel = new CategoryModel();
  }

  getAllCategories = catchAsyncError(async (req, res) => {
    const allCategories = await this.categoryModel.getCategories();
    return res.send(ApiResponse.success(allCategories, "All categories retrieved successfully"));
  });
}
