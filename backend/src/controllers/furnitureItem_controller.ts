import { AddFurnitureItemRequestBody, GetFurnitureItemsFiltersReqQuery } from "@src/Types";
import { AppError } from "@src/errors/AppError";
import { FurnitureItemModel } from "@src/models/FurnitureItemModel";
import { cloudflareService } from "@src/services/cloudflare/CloudflareService";
import ApiResponse from "@src/utils/ApiResponse";
import { catchAsyncError } from "@src/utils/catchAsyncError";
import { getParsedFilters } from "@src/utils/getParsedFilters";
import { Request } from "express";
import { v4 as uuidv4 } from "uuid";

export class FurnitureItemController {
  private furnitureItemModel: FurnitureItemModel;

  constructor() {
    this.furnitureItemModel = new FurnitureItemModel();
  }

  public getFurnitureItems = catchAsyncError(async (req: Request<any, any, any, GetFurnitureItemsFiltersReqQuery>, res) => {
    const { category_id, itemsPerPage, page } = req.query;
    const filters = getParsedFilters({ category_id, itemsPerPage, page });

    const items = await this.furnitureItemModel.getAllFurnitureItems(filters);

    if (!items.length) throw new AppError("No Item Found", 404);

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

  public getFurnitureItemFromID = catchAsyncError(async (req: Request<{ id?: string }, any, any>, res) => {
    const { id } = req.params;
    if (!id) throw new AppError("Id is required", 400);

    const item = await this.furnitureItemModel.getFurnitureItemFromID(parseInt(id));
    if (!item) throw new AppError("Furniture item not found", 404);

    return res.send(ApiResponse.success(item, "Furniture item retrieved successfully"));
  });

  public addFurnitureItem = catchAsyncError(async (req: Request<object, object, AddFurnitureItemRequestBody>, res) => {
    const { name, stock_quantity, color, dimension, weight, category_id, price, description } = req.body;
    const newItem = await this.furnitureItemModel.addFurnitureItem({ name, stock_quantity, color, dimension, description, weight, Category: {
      connect: { id: category_id },
    }, price: price });

    return res.send(ApiResponse.success(newItem, "Furniture item added successfully", 201));
  });

  public uploadFiles = catchAsyncError(async (req, res) => {
    const folderName = `furniture-images/${uuidv4()}`;
    const uploadedUrls = await cloudflareService.uploadFiles(req.files, folderName);
    // TODO: save urls in db

    return res.send(ApiResponse.success(uploadedUrls, "Files uploaded successfully", 200));
  });
}
