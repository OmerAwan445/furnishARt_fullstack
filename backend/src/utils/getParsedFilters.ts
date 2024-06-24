import { GetFurnitureItemsFilters, GetFurnitureItemsFiltersReqQuery } from "@src/Types";
import { removeUndefinedFromObject } from "./common/removeUndefinesFromObjext";


const DEFAULTPAGE = 1;
const DEFAULTITEMSPERPAGE = 7;
const MAXITEMSPERPAGE = 100;

export function getParsedFilters(appliedFilters: GetFurnitureItemsFiltersReqQuery) {
  const sort_by = "createdAt";
  const sort_order: "desc" | "asc" = "desc";
  const filters = removeUndefinedFromObject<GetFurnitureItemsFiltersReqQuery>(appliedFilters);
  const parsedFilters: GetFurnitureItemsFilters = Object.fromEntries(
      Object.entries(filters).map(([key, value]) => {
        if (key === 'category_id') {
          return [key, (value).split(',').map(Number)];
        }
        return [key, parseInt(value)];
      }),
  ) as GetFurnitureItemsFilters;

  const { itemsPerPage = DEFAULTITEMSPERPAGE, page = DEFAULTPAGE, category_id, ...rest } = parsedFilters;

  const whereClause = {
    ...rest,
    ...(category_id ? { category_id: { in: category_id } } : {}),
  };

  const skip = (page - 1) * itemsPerPage;
  return {
    whereClause,
    orderBy: { [sort_by]: sort_order },
    take: Math.min(Math.max(itemsPerPage, DEFAULTITEMSPERPAGE), MAXITEMSPERPAGE), skip };
}
