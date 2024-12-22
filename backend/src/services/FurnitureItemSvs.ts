import { Prisma } from "@prisma/client";
import { FurnitureItemModel } from "@src/models/FurnitureItemModel";
import { EditFurnitureItemRequestBody } from "@src/Types";

class FurnitureItemSvs {
  private readonly FurnitureItemModel: FurnitureItemModel;

  constructor() {
    this.FurnitureItemModel = new FurnitureItemModel();
  }

  public async editFurnitureItems(data: EditFurnitureItemRequestBody) {
    const { id, name, stock_quantity, color, dimension, weight, category_id, price, description } = data;
    let editFilter: Prisma.FurnitureItemUpdateInput = { name, stock_quantity, color, dimension, description, weight, price: price };
    if (category_id) {
      editFilter = { ...editFilter, Category: { connect: { id: category_id } } };
    }
    return await this.FurnitureItemModel.updateFurnitureItem(id, editFilter);
  }
}

export default FurnitureItemSvs;
