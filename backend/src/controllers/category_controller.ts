import { CategoryModel } from "@src/models/CategoryModel";
import { AddCategoryRequestBody } from "@src/Types";
import ApiResponse from "@src/utils/ApiResponse";
import { catchAsyncError } from "@src/utils/catchAsyncError";
import { Request } from "express";

export class CategoryController {
  private categoryModel: CategoryModel;

  constructor() {
    this.categoryModel = new CategoryModel();
  }

  getAllCategories = catchAsyncError(async (req, res) => {
    const allCategories = await this.categoryModel.getCategories();
    return res.send(ApiResponse.success(allCategories, "All categories retrieved successfully"));
  });

  addCategory = catchAsyncError(async (req: Request<object, object, AddCategoryRequestBody>, res) => {
    await this.categoryModel.addCategory(req.body.name);

    return res.send(ApiResponse.success([], "Category add successfully"));
  });
}
