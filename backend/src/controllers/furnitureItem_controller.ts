import { AddFurnitureItemRequestBody, EditFurnitureItemRequestBody,
  GetFurnitureItemsFiltersReqQuery, UpdateStocksReqBody, UploadMediaReqQuery } from "@src/Types";
import { AppError } from "@src/errors/AppError";
import { FurnitureItemModel } from "@src/models/FurnitureItemModel";
import FurnitureItemSvs from "@src/services/FurnitureItemSvs";
import ApiResponse from "@src/utils/ApiResponse";
import { catchAsyncError } from "@src/utils/catchAsyncError";
import { getParsedFilters } from "@src/utils/getParsedFilters";
import { Request } from "express";

export class FurnitureItemController {
  private furnitureItemModel: FurnitureItemModel;
  private furnitureItemSvs: FurnitureItemSvs;

  constructor() {
    this.furnitureItemModel = new FurnitureItemModel();
    this.furnitureItemSvs = new FurnitureItemSvs();
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

  public editFurnitureItems = catchAsyncError(async (req: Request<object, object, EditFurnitureItemRequestBody>, res) => {
    const updatedItem = await this.furnitureItemSvs.editFurnitureItems(req.body);
    return res.send(ApiResponse.success(updatedItem, "Furniture item updated successfully", 200));
  });

  public deleteFurnitureItem = catchAsyncError(async (req: Request<{ id?: string }, any, any>, res) => {
    const { id } = req.params;

    await this.furnitureItemSvs.deleteFurnitureItem(Number(id));
    return res.send(ApiResponse.success(null, "Furniture item deleted successfully", 200));
  });

  public updateStocks = catchAsyncError(async (req: Request<object, object, UpdateStocksReqBody>, res) => {
    const { itemId, quantity } = req.body;
    await this.furnitureItemModel.updateStocks(itemId, quantity);

    return res.send(ApiResponse.success(null, "Stocks updated successfully", 200));
  });

  public uploadImageFiles = catchAsyncError(async (req: Request<any, any, any, UploadMediaReqQuery>, res) => {
    const { itemId } = req.query;
    const uploadedUrl = await this.furnitureItemSvs.uploadFurnitureImages(Number(itemId), req.files);

    return res.send(ApiResponse.success(uploadedUrl, "Files uploaded successfully", 200));
  });

  public uploadModelFiles = catchAsyncError(async (req: Request<any, any, any, UploadMediaReqQuery>, res) => {
    const { itemId } = req.query;
    const uploadedUrl = await this.furnitureItemSvs.uploadFurnitureModel(req.files![0], Number(itemId));
    return res.send(ApiResponse.success(uploadedUrl, "Files uploaded successfully", 200));
  });
}
