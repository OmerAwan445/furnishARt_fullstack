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

  editCategory = catchAsyncError(async (req: Request<object, object, {id: string, name: string}>, res) => {
    const { id, name } = req.body;
    await this.categoryModel.editCategory(Number(id), name);

    return res.send(ApiResponse.success([], "Category Edited successfully"));
  });

  deleteCategory = catchAsyncError(async (req: Request<object, object, AddCategoryRequestBody, {id?: string}>, res) => {
    const { id } = req.query;
    await this.categoryModel.deleteCategory(Number(id));

    return res.send(ApiResponse.success([], "Category Updated successfully"));
  });
}
