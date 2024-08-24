import { GetFurnitureItemsFiltersReqQuery } from "@src/Types";
import { FurnitureItemModel } from "@src/models/FurnitureItemModel";
import ApiResponse from "@src/utils/ApiResponse";
import { catchAsyncError } from "@src/utils/catchAsyncError";
import { getParsedFilters } from "@src/utils/getParsedFilters";
import { Request } from "express";
import path from "path";
import fs from 'fs';

const modelsDirectory = path.resolve('src/assets/3D-Models');

export class FurnitureItemController {
  private furnitureItemModel: FurnitureItemModel;

  constructor() {
    this.furnitureItemModel = new FurnitureItemModel();
  }

  public getFurnitureItems = catchAsyncError(async (req: Request<any, any, any, GetFurnitureItemsFiltersReqQuery>, res) => {
    const { category_id, itemsPerPage, page } = req.query;
    const filters = getParsedFilters({ category_id, itemsPerPage, page });

    const items = await this.furnitureItemModel.getAllFurnitureItems(filters);

    if (!items.length) return res.status(404).send(ApiResponse.error("No Item Found", 404));

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
    if (!id) return res.status(400).send(ApiResponse.error("Id is required", 400));

    const item = await this.furnitureItemModel.getFurnitureItemFromID(parseInt(id));
    if (!item) return res.status(404).send(ApiResponse.error("Furniture item not found", 404));

    return res.send(ApiResponse.success(item, "Furniture item retrieved successfully"));
  });

  public getFurnitureItem3DModelFromID = catchAsyncError(async (req: Request<{ id?: string }, any, any>, res) => {
    const fileName = req.params.id;
    const glbPath = path.join(modelsDirectory, `${fileName}.glb`);
    const gltfPath = path.join(modelsDirectory, `${fileName}.gltf`);

    let modelPath = '';

    if (fs.existsSync(glbPath)) {
      modelPath = glbPath;
    } else if (fs.existsSync(gltfPath)) {
      modelPath = gltfPath;
    }
    if (modelPath) {
      res.setHeader('Content-Type', 'model/gltf-binary');
      res.setHeader('Content-Length', fs.statSync(modelPath).size);

      res.status(200).sendFile(modelPath);
    } else {
      res.status(404).send(ApiResponse.error("Model not Found", 404));
    }
  });
}
