import { FiltersSliceState } from "@/types/Types";

const DEFAULTITEMSPERPAGE = 7;
export function makeFiltersQuery(filters: FiltersSliceState) {
    let filtersQuery = '';
    if(filters.page) {
        filtersQuery += `page=${filters.page ?? 1}&`;
    }
    
    if(filters.itemsPerPage) {
        filtersQuery += `itemsPerPage=${filters.itemsPerPage ?? DEFAULTITEMSPERPAGE}&`;
    }

    if(filters.category_ids?.length){
        filtersQuery += `category_id=${filters.category_ids.join(",")}&`;
    }

    return filtersQuery;
}
