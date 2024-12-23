import { Prisma } from "@prisma/client";
import { FurnitureItemModel } from "@src/models/FurnitureItemModel";
import { EditFurnitureItemRequestBody } from "@src/Types";
import { cloudflareService, CloudflareService } from "./cloudflare/CloudflareService";
import { AppError } from "@src/errors/AppError";

class FurnitureItemSvs {
  private readonly furnitureItemModel: FurnitureItemModel;
  private readonly cloudFlareService: CloudflareService;

  constructor() {
    this.furnitureItemModel = new FurnitureItemModel();
    this.cloudFlareService = new CloudflareService();
  }

  public async editFurnitureItems(data: EditFurnitureItemRequestBody) {
    const { id, name, stock_quantity, color, dimension, weight, category_id, price, description } = data;
    let editFilter: Prisma.FurnitureItemUpdateInput = { name, stock_quantity, color, dimension, description, weight, price: price };
    if (category_id) {
      editFilter = { ...editFilter, Category: { connect: { id: category_id } } };
    }
    return await this.furnitureItemModel.updateFurnitureItem(id, editFilter);
  }

  public async uploadFurnitureImages(id: number, files: Express.Multer.File[] | undefined) { // eslint-disable-line
    const item = await this.furnitureItemModel.getFurnitureItemFromID(id);
    if (!item) throw new AppError(`FurnitureItem with id:${id} not found`, 404);
    const folderName = `furniture-images/${id}`;
    const uploadedUrls = await this.cloudFlareService.uploadImageFiles(files, folderName);
    await this.furnitureItemModel.updateFurnitureImageUrls(id, uploadedUrls);
    return uploadedUrls;
  }

  public async uploadFurnitureModel(file: Express.Multer.File | undefined, id: number) { // eslint-disable-line
    const item = await this.furnitureItemModel.getFurnitureItemFromID(id);
    if (!item) throw new AppError(`FurnitureItem with id:${id} not found`, 404);
    const folderName = `3D-Models`;
    const uploadedUrl = await cloudflareService.uploadModelFile(file, folderName, id);
    await this.furnitureItemModel.updateFurnitureModelUrl(id, uploadedUrl);
    return uploadedUrl;
  }


  public async deleteFurnitureItem(id: number) {
    // delete its model.
    Promise.all([
      await this.cloudFlareService.deleteModel("3D-Models", id, "glb"),
      // delete its images.
      await this.cloudFlareService.deleteFolder("furniture-images/" + id),
      await this.furnitureItemModel.deleteFurnitureItem(id),
    ]);
  }
}

export default FurnitureItemSvs;
