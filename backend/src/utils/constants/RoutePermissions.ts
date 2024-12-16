import { ROLES } from "./Roles";

export const routePermissions = Object.freeze({
  cart: [ROLES.USER],
  stripe: [ROLES.USER],
});
