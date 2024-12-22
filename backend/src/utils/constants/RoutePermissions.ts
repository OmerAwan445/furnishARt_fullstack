import { ROLES } from "./Roles";

export const routePermissions = Object.freeze({
  cart: [ROLES.USER],
  stripe: [ROLES.USER],
  category: {
    add: [ROLES.ADMIN],
    edit: [ROLES.ADMIN],
  },
  furnitureItem: {
    add: [ROLES.ADMIN],
    edit: [ROLES.ADMIN],
    delete: [ROLES.ADMIN],
    upload_media: [ROLES.ADMIN],
    update_stocks: [ROLES.ADMIN],
  },
  order: [ROLES.ADMIN],
});
