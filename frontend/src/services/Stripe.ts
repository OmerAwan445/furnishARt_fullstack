import { authorizedFetchApiCall } from "@/utils/apiUtils/authorizedApiCall";
import { BACKEND_API_ENDPOINTS } from "./apiEndpoints/apiEndpoints";

class StripeServices {
  private static BASE_URL_SS = process.env.BACKEND_API_URL;

  static async getStripeCusAccId() {
    const { data, error } = await authorizedFetchApiCall<{
      stripe_customer_id: string;
    }>(async (config) => {
      const response = await fetch(
        this.BASE_URL_SS + BACKEND_API_ENDPOINTS.getStripeCustomerAccountId,
        {
          ...config,
          cache: "force-cache",
        }
      );
      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
      return { data: result.data };
    });

    if (error || !data) return undefined;
    return data.stripe_customer_id;
  }
}

export default StripeServices;