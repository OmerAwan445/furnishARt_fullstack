import { ROLES } from "./Roles";

export const routePermissions = Object.freeze({
  cart: [ROLES.USER],
  stripe: [ROLES.USER],
  category: {
    add: [ROLES.ADMIN],
  },
  furnitureItem: {
    add: [ROLES.ADMIN],
  },
});
